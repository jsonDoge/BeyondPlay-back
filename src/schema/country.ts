import { buildHTTPExecutor } from '@graphql-tools/executor-http';

import { buildSchema } from 'graphql';

const countriesGQLschema = buildSchema(`
  type Country {
    code: ID!
    name: String
    emoji: String
  }

  type Query {
    countries: [Country!]!
  }  
`);

const remoteExecutor = buildHTTPExecutor({
  endpoint: 'https://countries.trevorblades.com',
});

export const countrySubschema = {
  schema: countriesGQLschema,
  executor: remoteExecutor,
};
