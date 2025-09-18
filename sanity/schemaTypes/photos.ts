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
      name: "dimensions",
      title: "Dimensions (WxH)",
      type: "string",
      description: "Select intrinsic dimensions (from current gallery data)",
      options: {
        list: [
          { title: "800x600", value: "800x600" },
          { title: "600x800", value: "600x800" },
          { title: "1200x600", value: "1200x600" },
          { title: "800x800", value: "800x800" },
          { title: "600x600", value: "600x600" },
          { title: "600x400", value: "600x400" },
          { title: "1200x800", value: "1200x800" },
          { title: "400x600", value: "400x600" },
          { title: "800x400", value: "800x400" },
        ],
      },
      initialValue: "800x600",
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
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "◼️ 1×1", value: "span 1 / span 1" },
          { title: "▬ 1×2", value: "span 1 / span 2" },
          { title: "▮ 2×1", value: "span 2 / span 1" },
          { title: "⬛ 2×2", value: "span 2 / span 2" },
        ],
      },
      initialValue: "span 1 / span 1",
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
      gridArea: "gridArea",
    },
    prepare(selection) {
      const { title, media, gridArea } = selection as {
        title: string;
        media: any;
        gridArea?: string;
      };
      return {
        title,
        media,
        subtitle: gridArea,
      };
    },
  },
});
