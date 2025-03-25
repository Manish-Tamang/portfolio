import { defineField, defineType } from 'sanity';

export const timeline = defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1900).max(new Date().getFullYear())
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(500)
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year'
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Year ${selection.subtitle}`
      };
    }
  }
});