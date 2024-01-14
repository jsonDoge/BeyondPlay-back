import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { buildSchema } from 'graphql';

const liftsGQLschema = buildSchema(`
  type Lift {
    id: ID!
    name: String!
    status: LiftStatus
    capacity: Int!
    night: Boolean!
    elevationGain: Int!
  }

  enum LiftStatus {
    OPEN
    CLOSED
    HOLD
  }

  type Query {
    Lift(id: ID!): Lift!
    liftCount(status: LiftStatus): Int!
    allLifts(status: LiftStatus): [Lift!]!
  }
`);

const remoteExecutor = buildHTTPExecutor({
  endpoint: 'http://snowtooth.moonhighway.com',
  method: 'POST',
});

export const liftSubschema = {
  schema: liftsGQLschema,
  executor: remoteExecutor,
};