// src/sanity/schemaTypes/index.js

import project from './project';
import clientLogo from './clientLogo';
import siteSettings from './siteSettings';

export const schema = {
  types: [
    project,
    clientLogo,
    siteSettings,
  ],
};