import { config } from 'dotenv';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

config();

import { healthRouter } from './routes/health';
import { mergedGQLSchema } from './schema';
import { resolvers } from './resolvers';

async function bootstrap() {
  if (!process.env.SERVER_PORT) {
    throw new Error('Please define port');
  }

  const port = process.env.SERVER_PORT;

  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs: mergedGQLSchema,
    resolvers: resolvers,
  });

  await apolloServer.start();

  app.use(cors());
  app.use(bodyParser.json({ limit: '50mb' }));

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
