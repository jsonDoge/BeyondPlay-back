import { config } from 'dotenv';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { ApolloGateway, IntrospectAndCompose, LocalGraphQLDataSource, RemoteGraphQLDataSource } from '@apollo/gateway';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { transformSchemaFederation } from 'graphql-transform-federation';
import { AsyncExecutor } from '@graphql-tools/delegate';

config();

import { healthRouter } from './routes/health';
import { resolvers } from './resolvers';
import { countryExecutor } from './executors/country';
import { liftExecutor } from './executors/lift';
import { logsGQLschema } from './schema/log';

async function bootstrap() {
  if (!process.env.SERVER_PORT) {
    throw new Error('Please define port');
  }

  const port = process.env.SERVER_PORT;

  const app = express();

  const countrySchema = await introspectSchema(countryExecutor as AsyncExecutor);
  const liftSchema = await introspectSchema(liftExecutor as AsyncExecutor);

  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'countries', url: 'https://countries.trevorblades.com' },
        { name: 'lifts', url: 'https://snowtooth.moonhighway.com' },
      ],
    }),
    buildService: ({ url }) => {
      if (url === 'https://countries.trevorblades.com') {
        return new LocalGraphQLDataSource(
          transformSchemaFederation(wrapSchema({ schema: countrySchema, executor: countryExecutor as AsyncExecutor }), {
            Query: { extend: true },
          }),
        );
      }

      if (url === 'https://snowtooth.moonhighway.com') {
        return new LocalGraphQLDataSource(
          transformSchemaFederation(wrapSchema({ schema: liftSchema, executor: liftExecutor as AsyncExecutor }), {
            Query: { extend: true },
          }),
        );
      }

      return new RemoteGraphQLDataSource({ url });
    },
  });

  const localSchema = makeExecutableSchema({
    typeDefs: logsGQLschema,
    resolvers,
  });

  const apolloGateway = new ApolloServer({ gateway });
  await apolloGateway.start();

  const apolloServer = new ApolloServer({ schema: localSchema });
  await apolloServer.start();

  app.use(cors());
  app.use(bodyParser.json({ limit: '50mb' }));

  app.use('/graphql-gateway', expressMiddleware(apolloGateway));
  app.use('/graphql', expressMiddleware(apolloServer));
  app.use('/', healthRouter);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: { message: 'What the hell is even that' } });
    }
    next();
  });

  app.listen(port, () => {
    console.info(`Server started at port ${port}`);
  });
}

bootstrap().catch(console.error);
