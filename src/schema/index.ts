import { logsGQLschema } from './log';
import { loginGQLschema } from './login';

const { mergeSchemas } = require('@graphql-tools/schema');

export const mergedSchema = mergeSchemas({ schemas: [logsGQLschema, loginGQLschema] });
