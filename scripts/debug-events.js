#!/usr/bin/env node

import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const EVENT_DIR = join(__dirname, '..', 'src', 'content', 'event');

async function debugEvents() {
  console.log('🔍 Debugging event files...\n');
  
  try {
    const files = await readdir(EVENT_DIR);
    console.log(`📁 All files in event directory:`);
    
    const mdocFiles = [];
    const mdxFiles = [];
    const mdFiles = [];
    const otherFiles = [];
    
    for (const file of files) {
      if (file.endsWith('.mdoc')) {
        mdocFiles.push(file);
      } else if (file.endsWith('.mdx')) {
        mdxFiles.push(file);
      } else if (file.endsWith('.md')) {
        mdFiles.push(file);
      } else if (!file.startsWith('.')) {
        otherFiles.push(file);
      }
    }
    
    console.log(`\n✅ .mdoc files (${mdocFiles.length}):`);
    mdocFiles.forEach(f => console.log(`  - ${f}`));
    
    console.log(`\n📝 .mdx files (${mdxFiles.length}):`);
    mdxFiles.forEach(f => console.log(`  - ${f}`));
    
    console.log(`\n📄 .md files (${mdFiles.length}):`);
    mdFiles.forEach(f => console.log(`  - ${f}`));
    
    console.log(`\n📂 Other files/directories (${otherFiles.length}):`);
    otherFiles.forEach(f => console.log(`  - ${f}`));
    
    console.log('\n🎯 Event pages should filter for: !id.startsWith("_") && id.endsWith(".mdoc")');
    console.log('This means only .mdoc files that don\'t start with underscore will be shown.');
    
    const validEvents = mdocFiles.filter(f => !f.startsWith('_'));
    console.log(`\n✨ Valid event files (${validEvents.length}):`);
    validEvents.forEach(f => console.log(`  - ${f} → slug: ${f.replace('.mdoc', '')}`));
    
  } catch (error) {
    console.error('Error reading event directory:', error);
  }
}

debugEvents();