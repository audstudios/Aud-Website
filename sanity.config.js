// sanity.config.js
// Updated with Cloudinary plugin for visual media selection

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { cloudinaryAssetSourcePlugin } from 'sanity-plugin-cloudinary';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Aud Studios',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
    // Cloudinary plugin - enables visual media picker in Sanity Studio
    cloudinaryAssetSourcePlugin({
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'din7i5lsw',
    }),
  ],

  schema: {
    types: schema,
  },
});