import {defineField, defineType} from 'sanity'

/**
 * Single document with the free consultation texts and booking link, used by the homepage block
 * (right after the intro) and the services page section.
 */
export const consultationType = defineType({
  name: 'consultation',
  title: 'Free consultation',
  type: 'document',
  groups: [
    {name: 'home', title: 'Homepage', default: true},
    {name: 'services', title: 'Services page'},
    {name: 'booking', title: 'Booking'},
  ],
  fields: [
    defineField({
      name: 'homeHeading',
      title: 'Homepage heading',
      type: 'string',
      group: 'home',
      initialValue: 'Have a technical challenge or project in mind?',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'homeText',
      title: 'Homepage line',
      type: 'string',
      group: 'home',
      description: 'One short sentence under the heading.',
      initialValue: 'Let’s talk about it. I offer a free 30-minute initial consultation.',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'servicesLinkLabel',
      title: 'Second button (goes to Services)',
      type: 'string',
      group: 'home',
      initialValue: 'Explore My Services',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'title',
      title: 'Services page heading',
      type: 'string',
      group: 'services',
      initialValue: 'Free 30-Minute Technical Consultation',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'text',
      title: 'Services page text',
      type: 'text',
      rows: 4,
      group: 'services',
      initialValue:
        'Have a technical challenge, an idea for an AI implementation, or a product that needs improvement? Let’s spend 30 minutes looking at the problem. No sales pitch — just a technical conversation about what you’re trying to accomplish and possible ways to approach it.',
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Booking button label',
      type: 'string',
      group: 'booking',
      description: 'Used on both the homepage and the services page.',
      initialValue: 'Book a Free Consultation',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking link',
      type: 'url',
      group: 'booking',
      description:
        'Your Cal.com event link, e.g. https://cal.com/your-name/30min. It opens as a popup on the site, and Cal.com emails the invite to both of you. Other tools (Calendly…) open in a new tab. Leave empty to open the contact form instead.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
  ],
  preview: {prepare: () => ({title: 'Free consultation'})},
})
