import {defineField, defineType} from 'sanity'

/** A short, funny note about how the site was built. Shown as sticky notes on the homepage. */
export const siteLogEntryType = defineType({
  name: 'siteLogEntry',
  title: 'Site log',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A short headline, e.g. "The Animation Tax".',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'text',
      title: 'Note',
      type: 'text',
      rows: 4,
      description: 'Keep it short so it fits on a sticky note (about 2–3 sentences).',
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers show first. The number is also printed on the note (#01, #02…).',
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'text', order: 'order'},
    prepare: ({title, subtitle, order}) => ({
      title: order != null ? `#${String(order).padStart(2, '0')} ${title}` : title,
      subtitle,
    }),
  },
})
