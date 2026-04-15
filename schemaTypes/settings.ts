import {defineField, defineType} from 'sanity'

export const settings = defineType({
 name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Default Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
    },
  ],
})