import { buildHTTPExecutor } from '@graphql-tools/executor-http';

export const countryExecutor = buildHTTPExecutor({
  endpoint: 'https://countries.trevorblades.com',
  method: 'POST',
});
