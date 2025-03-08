import { defineType } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    {
      name: "id",
      title: "ID",
      type: "string",
      description: "Unique identifier for the photo.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Alternative text for accessibility",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "gridArea",
      title: "Grid Area",
      type: "string",
      description:
        'Defines the size and placement in the grid (e.g., "span 1 / span 1", "span 1 / span 2", "span 2 / span 2")',
      options: {
        list: [
          { title: "Square (1x1)", value: "span 1 / span 1" },
          { title: "Horizontal Rectangle (1x2)", value: "span 1 / span 2" },
          { title: "Vertical Rectangle (2x1)", value: "span 2 / span 1" },
          { title: "Large Square (2x2)", value: "span 2 / span 2" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "priority",
      title: "Priority",
      type: "boolean",
      description: "Whether to mark this image as high priority for loading",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "id",
      media: "image",
    },
  },
});
