#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' });
/**
 * Cloudinary Asset Migration Script
 * 
 * This script uploads your local media assets to Cloudinary
 * while maintaining the folder structure.
 * 
 * Usage:
 * 1. Install dependencies: npm install cloudinary dotenv
 * 2. Set environment variables or create .env file
 * 3. Run: node scripts/upload-to-cloudinary.js
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Folder mappings from local to Cloudinary
const FOLDER_MAPPINGS = {
  'public/images/RizzlerHardees': 'aud-studios/projects/rizzler-hardees',
  'public/images/JPG': 'aud-studios/projects/jean-paul-gaultier',
  'public/images/CardiBDoorDash': 'aud-studios/projects/cardi-doordash',
  'public/images/flav': 'aud-studios/projects/flav',
  'public/images/logos': 'aud-studios/logos',
  'public/images/about': 'aud-studios/about',
  'public/images/homeblur': 'aud-studios/home/slider-backgrounds',
  'public/images/work': 'aud-studios/work',
  'public/images/global': 'aud-studios/global',
  'public/images/projectcard': 'aud-studios/work/cards',
  'public/videos': 'aud-studios/videos',
  'public/icons': 'aud-studios/icons',
  'public/images': 'aud-studios/images', // Catch-all for other images
};

// Supported file extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];

/**
 * Get the Cloudinary folder for a local file path
 */
function getCloudinaryFolder(localPath) {
  for (const [localFolder, cloudinaryFolder] of Object.entries(FOLDER_MAPPINGS)) {
    if (localPath.startsWith(localFolder)) {
      return cloudinaryFolder;
    }
  }
  return 'aud-studios/misc';
}

/**
 * Get the public ID for a file (path without extension)
 */
function getPublicId(localPath, cloudinaryFolder) {
  const relativePath = localPath.replace(/^public\//, '');
  const fileName = path.basename(relativePath, path.extname(relativePath));
  
  // Get subdirectories if any
  const localDir = path.dirname(localPath);
  const mappedFolder = Object.entries(FOLDER_MAPPINGS).find(([local]) => 
    localPath.startsWith(local)
  );
  
  if (mappedFolder) {
    const subPath = localDir.replace(mappedFolder[0], '').replace(/^\//, '');
    if (subPath) {
      return `${cloudinaryFolder}/${subPath}/${fileName}`;
    }
  }
  
  return `${cloudinaryFolder}/${fileName}`;
}

/**
 * Upload a single file to Cloudinary
 */
async function uploadFile(localPath) {
  const ext = path.extname(localPath).toLowerCase();
  const isVideo = VIDEO_EXTENSIONS.includes(ext);
  const isImage = IMAGE_EXTENSIONS.includes(ext);
  
  if (!isVideo && !isImage) {
    console.log(`⏭️  Skipping unsupported file: ${localPath}`);
    return null;
  }

  const cloudinaryFolder = getCloudinaryFolder(localPath);
  const publicId = getPublicId(localPath, cloudinaryFolder);

  const uploadOptions = {
    public_id: publicId,
    resource_type: isVideo ? 'video' : 'image',
    overwrite: false, // Don't overwrite existing files
    invalidate: true,
  };

  try {
    const result = await cloudinary.uploader.upload(localPath, uploadOptions);
    console.log(`✅ Uploaded: ${localPath} → ${result.public_id}`);
    return result;
  } catch (error) {
    if (error.message?.includes('already exists')) {
      console.log(`⏭️  Already exists: ${localPath}`);
      return null;
    }
    console.error(`❌ Failed to upload ${localPath}:`, error.message);
    return null;
  }
}

/**
 * Recursively find all media files in a directory
 */
function findMediaFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      findMediaFiles(fullPath, files);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext) || VIDEO_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🚀 Starting Cloudinary migration...\n');

  // Verify configuration
  if (!cloudinary.config().cloud_name) {
    console.error('❌ Error: CLOUDINARY_CLOUD_NAME not set');
    console.log('Please set the following environment variables:');
    console.log('  CLOUDINARY_CLOUD_NAME (or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)');
    console.log('  CLOUDINARY_API_KEY');
    console.log('  CLOUDINARY_API_SECRET');
    process.exit(1);
  }

  console.log(`📦 Cloud name: ${cloudinary.config().cloud_name}\n`);

  // Find all media files
  const directories = [
    'public/images',
    'public/videos',
    'public/icons',
  ];

  let allFiles = [];
  for (const dir of directories) {
    const files = findMediaFiles(dir);
    allFiles = allFiles.concat(files);
  }

  console.log(`📂 Found ${allFiles.length} media files\n`);

  // Upload files
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of allFiles) {
    const result = await uploadFile(file);
    if (result) {
      uploaded++;
    } else {
      skipped++;
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`   ✅ Uploaded: ${uploaded}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log('\n🎉 Migration complete!');
}

// Run migration
migrate().catch(console.error);