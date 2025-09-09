import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const inputDir = './src/assets/images';
const outputDir = './src/assets/images/webp';

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const files = readdirSync(inputDir).filter(file =>
  ['.jpg', '.jpeg', '.png', '.avif'].includes(extname(file).toLowerCase())
);

files.forEach(file => {
  const inputPath = join(inputDir, file);
  const outputPath = join(outputDir, `${basename(file, extname(file))}.webp`);

  sharp(inputPath)
    .resize({ width: 500 }) // limit width to 500px
    .webp({ quality: 75 })
    .toFile(outputPath)
    .then(() => console.log(`✅ Converted ${file} → ${outputPath}`))
    .catch(err => console.error(`❌ Error converting ${file}:`, err));
});
