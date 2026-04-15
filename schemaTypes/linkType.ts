import {defineField, defineType} from 'sanity'

export const linkType = defineType({
  name: 'link',
  title: 'External Links',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Label',
      type: 'string',
      description: 'The display text (e.g., GitHub, LinkedIn, Live Demo)',
      validation: (rule) => rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Social', value: 'social'},
          {title: 'Project', value: 'project'},
          {title: 'Professional', value: 'professional'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'icon',
      title: 'Icon Identifier',
      type: 'string',
      description: 'The string ID for your icon library (e.g., "github", "external-link", "mail")',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
  },
})