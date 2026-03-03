// sanity.config.js
// Main Next.js site - studio is hosted separately at *.sanity.studio

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Aud Studios',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
    // Cloudinary plugin is in the standalone studio (*.sanity.studio)
  ],

  schema: {
    types: schema,
  },
});