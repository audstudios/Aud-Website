// src/lib/sanity/portableText.js
// Helper to convert Sanity Portable Text to HTML strings

// Convert portable text blocks to array of HTML strings
// This maintains compatibility with your existing components
export function portableTextToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks)) return [];
  
  return blocks.map(block => {
    if (block._type !== 'block') return '';
    
    const children = block.children || [];
    const text = children.map(child => {
      if (child.marks?.includes('strong')) {
        return `<span class='font-bold'>${child.text}</span>`;
      }
      if (child.marks?.includes('em')) {
        return `<em>${child.text}</em>`;
      }
      return child.text;
    }).join('');
    
    return text;
  }).filter(Boolean);
}