import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

/** Document types that should only ever have one document. */
const SINGLETONS = new Set(['servicesPage'])

export default defineConfig({
  name: 'default',
  title: 'MySite',

  projectId: 'w8am8n9g',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // "Services page" opens its single document directly
            S.listItem()
              .title('Services page')
              .id('servicesPage')
              .child(S.document().schemaType('servicesPage').documentId('servicesPage')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !SINGLETONS.has(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Hide singletons from the global "Create new" menu
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETONS.has(schemaType)),
  },

  document: {
    // No "duplicate" or "delete" for singletons
    actions: (actions, {schemaType}) =>
      SINGLETONS.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
