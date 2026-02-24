// sanity/schemaTypes/siteSettings.js
// Schema for global site settings

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description: 'Global site configuration',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social Media' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Name of the site',
      initialValue: 'Aud Studios',
      group: 'general',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      description: 'Default meta description',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Site tagline',
      group: 'general',
    }),

    // Contact Information
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Primary contact email',
      initialValue: 'web@audstudios.com',
      group: 'contact',
    }),

    // Social Links
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without @ symbol',
      initialValue: 'the.audstudios',
      group: 'social',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social',
    }),

    // Footer Settings
    defineField({
      name: 'footerTagline1',
      title: 'Footer Tagline Line 1',
      type: 'string',
      initialValue: 'We are not the standard.',
      group: 'general',
    }),
    defineField({
      name: 'footerTagline2',
      title: 'Footer Tagline Line 2',
      type: 'string',
      initialValue: 'We are aud studios.',
      group: 'general',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
      };
    },
  },
});