import { buildSchema } from 'graphql';

export const logsGQLschema = buildSchema(`
  type Log {
    userId: String!
    endpoint: String!
  }

  type Query {
    logs: [Log!]!
    lastLog: Log
  }
`);
