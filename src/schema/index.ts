import { stitchSchemas } from '@graphql-tools/stitch';

import { liftSubschema } from './lift';
import { countrySubschema } from './country';
import { logsGQLschema } from './log';

const gatewaySchema = stitchSchemas({
  subschemas: [liftSubschema, countrySubschema, { schema: logsGQLschema }],
});

// TODO: more schema to be merged
export const mergedGQLSchema = gatewaySchema;
