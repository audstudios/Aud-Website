// sanity/schemaTypes/clientLogo.js
// Schema for managing client logos in the carousel

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'clientLogo',
  title: 'Client Logo',
  type: 'document',
  description: 'Client logos for the "Who we\'ve worked with" carousel',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'Name of the client/brand',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoUrl',
      title: 'Logo Image URL',
      type: 'string',
      description: 'Path to logo image (e.g., "/images/logos/CarouselLogo_png-09.png")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in the carousel (lower = first)',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this logo in the carousel',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      order: 'displayOrder',
    },
    prepare({ title, order }) {
      return {
        title: title,
        subtitle: `Order: ${order || 0}`,
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
      title: 'Client Name',
      name: 'clientNameAsc',
      by: [{ field: 'clientName', direction: 'asc' }],
    },
  ],
});