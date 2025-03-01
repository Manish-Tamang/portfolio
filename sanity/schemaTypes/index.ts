import { type SchemaTypeDefinition } from 'sanity';

import { post } from './post';
import { project } from './project';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, project],
};