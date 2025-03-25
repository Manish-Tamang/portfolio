import { type SchemaTypeDefinition } from "sanity";

import { post } from "./post";
import { project } from "./project";
import { photo } from "./photos";
import { timeline } from "./timeline";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, project, photo, timeline],
};
