import {defineField, defineType} from 'sanity'

/** Icons the website knows how to draw. Keep in sync with SERVICE_ICONS in the website. */
export const SERVICE_ICONS = [
  {title: 'Code', value: 'code'},
  {title: 'Globe / web', value: 'globe'},
  {title: 'Megaphone / marketing', value: 'megaphone'},
  {title: 'Compass / consulting', value: 'compass'},
  {title: 'Sparkles / AI', value: 'sparkles'},
  {title: 'Chart / growth', value: 'chart'},
  {title: 'Cloud', value: 'cloud'},
  {title: 'Shield / security', value: 'shield'},
  {title: 'People / teams', value: 'users'},
  {title: 'Rocket / launch', value: 'rocket'},
]

export const serviceType = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'shortTitle',
      title: 'Short name (optional)',
      type: 'string',
      description:
        'A shorter label for the rotating "incl. …" line on the homepage, e.g. "AI workflows". Leave empty to use the title.',
      validation: (rule) => rule.max(30),
    }),
    defineField({
      name: 'summary',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown under the title on the Services page.',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {list: SERVICE_ICONS},
      initialValue: 'code',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first (1, 2, 3…).',
      initialValue: 10,
    }),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'summary', order: 'order'},
    prepare: ({title, subtitle, order}) => ({
      title: order != null ? `${order}. ${title}` : title,
      subtitle,
    }),
  },
})
