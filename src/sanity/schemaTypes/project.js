// sanity/schemaTypes/project.js
// Main project schema for Aud Studios portfolio

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media Assets' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // Basic Info
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'The main title displayed on the project page',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (e.g., "jean-paul-gaultier")',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'settings',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'Client name(s) - e.g., "North Six // Jean Paul Gaultier"',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type / Our Role',
      type: 'string',
      description: 'Type of work - e.g., "Experiential and Event Content Production"',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'year',
      title: 'Year Released',
      type: 'string',
      description: 'Release year - e.g., "2025"',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),

    // Layout Configuration
    defineField({
      name: 'layout',
      title: 'Layout Type',
      type: 'string',
      description: 'Choose the project page layout',
      options: {
        list: [
          { title: 'Horizontal (16:9 hero video)', value: 'horizontal' },
          { title: 'Vertical (9:16 dual videos)', value: 'vertical' },
        ],
        layout: 'radio',
      },
      initialValue: 'horizontal',
      group: 'settings',
    }),

    // Hero Video - Horizontal Layout (URL-based for existing videos)
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'string',
      description: 'Path to hero video (e.g., "/images/JPG/JPGHeroFinal_Land.mp4")',
      hidden: ({ document }) => document?.layout === 'vertical',
      group: 'media',
    }),

    // Hero Videos - Vertical Layout
    defineField({
      name: 'heroVideoUrls',
      title: 'Hero Video URLs (Vertical)',
      type: 'array',
      description: 'Two vertical video paths for vertical layout',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(2),
      hidden: ({ document }) => document?.layout !== 'vertical',
      group: 'media',
    }),

    // Full Video for Modal
    defineField({
      name: 'fullVideoUrl',
      title: 'Full Video URL',
      type: 'string',
      description: 'Path to full video with audio for the modal',
      group: 'media',
    }),

    // Watch Link Toggle
    defineField({
      name: 'showWatchButton',
      title: 'Show "Watch in Full" Button',
      type: 'boolean',
      description: 'Toggle visibility of the watch button on hero',
      initialValue: true,
      group: 'hero',
    }),

    // Content Section
    defineField({
      name: 'mainline',
      title: 'Mainline / Tagline',
      type: 'text',
      description: 'The bold headline in the content section',
      rows: 2,
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'contentParagraphs',
      title: 'Content Paragraphs',
      type: 'array',
      description: 'Main content paragraphs (supports rich text with bold)',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      group: 'content',
    }),

    // Main Images (URL-based for existing images)
    defineField({
      name: 'mainImageUrls',
      title: 'Main Content Image URLs',
      type: 'array',
      description: 'Paths to primary images (e.g., "/images/RizzlerHardees/RizzlerHardees_01.jpg")',
      of: [{ type: 'string' }],
      group: 'media',
    }),

    // Sub Images
    defineField({
      name: 'subImageUrls',
      title: 'Sub Image URLs',
      type: 'array',
      description: 'Paths to secondary/smaller images',
      of: [{ type: 'string' }],
      group: 'media',
    }),

    // Brand Logo
    defineField({
      name: 'brandLogoUrl',
      title: 'Brand/Client Logo URL',
      type: 'string',
      description: 'Path to logo displayed at bottom of content section',
      group: 'media',
    }),

    // Work Page Settings
    defineField({
      name: 'workPageImageUrl',
      title: 'Work Page Card Image URL',
      type: 'string',
      description: 'Path to full-screen background image for the Work page card',
      group: 'media',
    }),
    defineField({
      name: 'workPageSubtitle',
      title: 'Work Page Subtitle',
      type: 'string',
      description: 'Optional subtitle shown on Work page (e.g., "Pride Event")',
      group: 'settings',
    }),

    // Home Slider Settings
    defineField({
      name: 'showOnHomeSlider',
      title: 'Show on Home Slider',
      type: 'boolean',
      description: 'Include this project in the home page slider',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'homeSliderOrder',
      title: 'Home Slider Order',
      type: 'number',
      description: 'Order in the home slider (lower = first)',
      hidden: ({ document }) => !document?.showOnHomeSlider,
      group: 'settings',
    }),
    defineField({
      name: 'homeSliderVideoUrl',
      title: 'Home Slider Video URL',
      type: 'string',
      description: 'Path to video shown in home page slider',
      hidden: ({ document }) => !document?.showOnHomeSlider,
      group: 'media',
    }),
    defineField({
      name: 'homeSliderBackgroundUrl',
      title: 'Home Slider Background URL',
      type: 'string',
      description: 'Path to blurred background image for home slider',
      hidden: ({ document }) => !document?.showOnHomeSlider,
      group: 'media',
    }),
    defineField({
      name: 'homeSliderTitleClass',
      title: 'Home Slider Title Style',
      type: 'string',
      description: 'CSS class for custom title styling',
      options: {
        list: [
          { title: 'Default', value: '' },
          { title: 'Jean Paul Style (smaller)', value: 'slide-jeanpaul' },
          { title: 'Flipped Frog Style', value: 'slide-flippedfrog' },
          { title: 'Frog Eating Style', value: 'slide-frogeating' },
        ],
      },
      hidden: ({ document }) => !document?.showOnHomeSlider,
      group: 'settings',
    }),
    defineField({
      name: 'homeSliderDisplayTitle',
      title: 'Home Slider Display Title',
      type: 'string',
      description: 'Custom title for home slider (defaults to project title)',
      hidden: ({ document }) => !document?.showOnHomeSlider,
      group: 'settings',
    }),

    // Display Order
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order on the Work page (lower = first)',
      initialValue: 0,
      group: 'settings',
    }),

    // Published Status
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to show/hide project on the site',
      initialValue: true,
      group: 'settings',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      client: 'client',
      year: 'year',
    },
    prepare({ title, client, year }) {
      return {
        title: title,
        subtitle: `${client} • ${year}`,
      };
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Year (Newest First)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
});