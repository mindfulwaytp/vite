import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SHEETDB_URL = 'https://sheetdb.io/api/v1/zpl35ateeao4a';

async function updateProviders() {
  try {
    const response = await fetch(SHEETDB_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('🔎 SheetDB response:', data);

    // Write providers.json
    const filePath = resolve(__dirname, '../src/data/providers.json');
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('✅ providers.json updated successfully!');

    // Write providers-meta.json with current timestamp
    const metaPath = resolve(__dirname, '../src/data/providers-meta.json');
    const metadata = { lastUpdated: new Date().toISOString() };
    await writeFile(metaPath, JSON.stringify(metadata, null, 2), 'utf8');
    console.log('✅ providers-meta.json updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating providers.json:', error);
  }
}

updateProviders();
