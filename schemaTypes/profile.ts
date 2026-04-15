import {defineField, defineType} from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Main page profile content',
  type: 'document',
  fields: [
{
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'e.g., Software Engineering Manager',
    },
    {
      name: 'bio',
      title: 'Bio Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }
      ]
    },
  ]
})