import { buildHTTPExecutor } from '@graphql-tools/executor-http';

export const liftExecutor = buildHTTPExecutor({
  endpoint: 'https://snowtooth.moonhighway.com',
  method: 'POST',
});
