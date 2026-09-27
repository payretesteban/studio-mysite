import {defineArrayMember, defineField, defineType} from 'sanity'

/** Pictures the website can draw on a Lab card. Keep in sync with `LabPreview` in nextjs-mysite/src/lib/lab.ts. */
const LAB_PREVIEWS = [
  {title: 'Retro game screen', value: 'game'},
  {title: 'Two languages side by side', value: 'readListen'},
  {title: 'Speed gauge', value: 'performance'},
  {title: 'Test results bar (shows the latest real numbers)', value: 'tests'},
  {title: 'Generic (flask)', value: 'generic'},
]

/** An experiment built into the site, shown as a card in the homepage's "The Lab" section. */
export const labItemType = defineType({
  name: 'labItem',
  title: 'Lab experiment',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'href',
      title: 'Page address',
      type: 'string',
      description: 'The page on this site, starting with "/", e.g. /read-listen.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^\/[a-z0-9/-]*$/i, {name: 'internal address'})
          .error('Use an address on this site that starts with "/", e.g. /read-listen.'),
    }),
    defineField({
      name: 'blurb',
      title: 'What it is',
      type: 'string',
      description: 'One short line, e.g. "Run Google Lighthouse on this site, live."',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'question',
      title: 'The question behind it',
      type: 'string',
      description: 'Optional. Shown in italics, e.g. "Can a portfolio be played instead of read?"',
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: 'tech',
      title: 'Built with',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Up to 4 short chips, e.g. "Gemini API".',
      options: {layout: 'tags'},
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: [{title: 'Live', value: 'live'}, {title: 'Beta', value: 'beta'}], layout: 'radio', direction: 'horizontal'},
      initialValue: 'live',
      description: 'Beta adds a small "Beta" tag to the card.',
    }),
    defineField({
      name: 'preview',
      title: 'Card picture',
      type: 'string',
      options: {list: LAB_PREVIEWS, layout: 'radio'},
      initialValue: 'generic',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers show first.',
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'href', status: 'status', order: 'order'},
    prepare: ({title, subtitle, status, order}) => ({
      title: `${order != null ? `${order}. ` : ''}${title}${status === 'beta' ? ' (beta)' : ''}`,
      subtitle,
    }),
  },
})
