import { config } from 'dotenv';

// TODO: expect fails to recognize graphQL response structure using assert
import assert from 'assert';
import path from 'path';
import { ApolloServer } from '@apollo/server';

config({ path: path.resolve(__dirname, '../.env.test') });

import { mergedGQLSchema } from '../src/schema';
import { resolvers } from '../src/resolvers';

describe('Logs', () => {
  it('returns empty logs', async () => {
    const testServer = new ApolloServer({
      typeDefs: mergedGQLSchema,
      resolvers,
    });

    const response = await testServer.executeOperation({
      query: '{ logs { userId, endpoint } }',
    });

    assert(response.body.kind === 'single');
    assert(response.body.singleResult.errors === undefined);

    // TODO: fix failing type inference
    assert((response.body.singleResult.data?.logs as any[]).length === 0);
  });
});