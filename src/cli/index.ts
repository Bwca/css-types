#!/usr/bin/env node

import { createTypesForStylesheets } from '../main';

const projectFolder = __dirname.replace('node_modules/css-types/dist', '');

const folderToScan = projectFolder + (process.argv[2] || 'src');

createTypesForStylesheets(folderToScan);