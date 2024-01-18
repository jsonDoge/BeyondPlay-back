import { buildSchema } from 'graphql';

export const loginGQLschema = buildSchema(`
  type Auth {
    token: String!
  } 

  type Mutation {
    login(username: String!, password: String!): Auth!
  }
`);
