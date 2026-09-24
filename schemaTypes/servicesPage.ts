import {defineField, defineType} from 'sanity'

/** Single document with the text around the services list (heading, intro, bottom banner). */
export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Services page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      initialValue: 'Services',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      description: 'Shown under the heading. Also used as the page description for search engines.',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Banner title',
      type: 'string',
      description: 'The banner at the bottom of the page, next to the “Let’s Work Together” button.',
      initialValue: 'Have a project in mind?',
    }),
    defineField({
      name: 'ctaText',
      title: 'Banner text',
      type: 'string',
      initialValue: 'Tell me what you need. I reply within 2 business days.',
    }),
  ],
  preview: {prepare: () => ({title: 'Services page'})},
})
