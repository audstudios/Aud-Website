// src/sanity/schemaTypes/project.js
// Updated with Cloudinary asset fields for visual media selection

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // Basic Info
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      description: 'e.g., Commercial Production, Event Coverage, etc.',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Horizontal', value: 'horizontal' },
          { title: 'Vertical', value: 'vertical' },
        ],
        layout: 'radio',
      },
      initialValue: 'horizontal',
    },

    // Hero Media - Using Cloudinary assets
    {
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'cloudinary.asset',
      description: 'Main hero video (click to browse Cloudinary)',
    },
    {
      name: 'heroVideos',
      title: 'Hero Videos (Multiple)',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      description: 'For vertical layout - multiple hero videos',
    },
    {
      name: 'fullVideo',
      title: 'Full Video (Watch in Full)',
      type: 'cloudinary.asset',
      description: 'Extended video shown in modal',
    },
    {
      name: 'showWatchButton',
      title: 'Show Watch Button',
      type: 'boolean',
      initialValue: true,
    },

    // Content
    {
      name: 'mainline',
      title: 'Mainline',
      type: 'string',
      description: 'Short tagline for the project',
    },
    {
      name: 'contentParagraphs',
      title: 'Content Paragraphs',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Main content paragraphs with rich text support',
    },

    // Images - Using Cloudinary assets
    {
      name: 'mainImages',
      title: 'Main Images',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      description: 'Primary project images',
    },
    {
      name: 'subImages',
      title: 'Sub Images',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      description: 'Secondary/supporting images',
    },
    {
      name: 'brandLogo',
      title: 'Brand Logo',
      type: 'cloudinary.asset',
      description: 'Client/brand logo',
    },

    // Work Page
    {
      name: 'workPageImage',
      title: 'Work Page Image',
      type: 'cloudinary.asset',
      description: 'Image shown on the /work page grid',
    },
    {
      name: 'workPageSubtitle',
      title: 'Work Page Subtitle',
      type: 'string',
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first on the work page',
    },
  ],

  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'brandLogo',
    },
    prepare({ title, client, media }) {
      return {
        title: title,
        subtitle: client,
        // Cloudinary assets have a secure_url we can use for preview
        media: media?.secure_url ? { _type: 'image', asset: { url: media.secure_url } } : undefined,
      };
    },
  },

  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Year (Newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
};