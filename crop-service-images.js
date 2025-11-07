import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const OUTPUT_DIR = 'client/public/services';

// Ensure output directory exists
await fs.mkdir(OUTPUT_DIR, { recursive: true });

// Service card images - 16:9 landscape (1200x675) for service cards
const images = [
  {
    input: 'attached_assets/WA47 with CUSTOM phillips tube_1762534727595.png',
    output: 'wa47-microphone-service.jpg',
    width: 1200,
    height: 675,
    crop: 'attention',
    quality: 85
  },
  {
    input: 'attached_assets/Midi 2_1762534727595.png',
    output: 'midi-keyboard-service.jpg',
    width: 1200,
    height: 675,
    crop: 'attention',
    quality: 85
  },
  {
    input: 'attached_assets/Yamaha HS8_1762534727596.png',
    output: 'yamaha-hs8-service.jpg',
    width: 1200,
    height: 675,
    crop: 'attention',
    quality: 85
  },
  {
    input: 'attached_assets/Apollo Twin x Duo_1762534727594.png',
    output: 'apollo-twin-service.jpg',
    width: 1200,
    height: 675,
    crop: 'attention',
    quality: 85
  }
];

console.log('🖼️  Processing service images (16:9)...\n');

for (const config of images) {
  try {
    const inputPath = config.input;
    const outputPath = path.join(OUTPUT_DIR, config.output);
    
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'cover',
        position: config.crop
      })
      .jpeg({
        quality: config.quality,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    console.log(`✅ ${config.output} (${config.width}x${config.height}) - ${sizeMB}MB`);
  } catch (error) {
    console.error(`❌ Error processing ${config.input}:`, error.message);
  }
}

console.log('\n✨ Service image processing complete!');
console.log(`📁 Output directory: ${OUTPUT_DIR}`);
