import {defineField, defineType} from 'sanity'

export const animations = defineType({
 name: 'animations',
  title: 'Fun animations',
  type: 'document',
  fields: [
    {
      name: 'class',
      title: 'animated class',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
    },
  ],
})