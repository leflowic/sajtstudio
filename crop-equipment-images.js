import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const OUTPUT_DIR = 'client/public/equipment';

// Ensure output directory exists
await fs.mkdir(OUTPUT_DIR, { recursive: true });

// Image processing configurations
const images = [
  // Hero Background - 16:9 landscape (1920x1080)
  {
    input: 'attached_assets/Background slika studija_1762534727595.png',
    output: 'hero-studio-background.jpg',
    width: 1920,
    height: 1080,
    crop: 'attention', // Smart crop focusing on important areas
    quality: 90
  },
  
  // Hardware Equipment - 4:5 portrait (800x1000) for grid showcase
  {
    input: 'attached_assets/Apollo Twin x Duo_1762534727594.png',
    output: 'apollo-twin-duo.jpg',
    width: 800,
    height: 1000,
    crop: 'attention',
    quality: 85
  },
  {
    input: 'attached_assets/WA47 with CUSTOM phillips tube_1762534727595.png',
    output: 'wa47-microphone.jpg',
    width: 800,
    height: 1000,
    crop: 'attention',
    quality: 85
  },
  {
    input: 'attached_assets/Yamaha HS8_1762534727596.png',
    output: 'yamaha-hs8.jpg',
    width: 800,
    height: 1000,
    crop: 'attention',
    quality: 85
  },
  {
    input: 'attached_assets/DT 990 PRO_1762534727596.png',
    output: 'dt990-headphones.jpg',
    width: 800,
    height: 1000,
    crop: 'attention',
    quality: 85
  },
  {
    input: 'attached_assets/Midi 2_1762534727595.png',
    output: 'midi-keyboard-1.jpg',
    width: 800,
    height: 1000,
    crop: 'attention',
    quality: 85
  },
  {
    input: 'attached_assets/Midi i screen_1762534727596.png',
    output: 'midi-keyboard-2.jpg',
    width: 800,
    height: 1000,
    crop: 'attention',
    quality: 85
  },
  
  // Software Screenshots - 16:9 landscape (1200x675) for wide cards
  {
    input: 'attached_assets/Neki od pluginova, uad pultec 1176 avalon 737 la2a 1073 neve_1762534727595.png',
    output: 'uad-plugins.jpg',
    width: 1200,
    height: 675,
    crop: 'attention',
    quality: 85
  },
  {
    input: 'attached_assets/AutoTune x RealTime UAD_1762534727596.png',
    output: 'autotune-realtime.jpg',
    width: 1200,
    height: 675,
    crop: 'attention',
    quality: 85
  }
];

console.log('🖼️  Starting image processing...\n');

for (const config of images) {
  try {
    const inputPath = config.input;
    const outputPath = path.join(OUTPUT_DIR, config.output);
    
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'cover', // Crop to fill exact dimensions
        position: config.crop
      })
      .jpeg({
        quality: config.quality,
        progressive: true,
        mozjpeg: true // Better compression
      })
      .toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    console.log(`✅ ${config.output} (${config.width}x${config.height}) - ${sizeMB}MB`);
  } catch (error) {
    console.error(`❌ Error processing ${config.input}:`, error.message);
  }
}

console.log('\n✨ Image processing complete!');
console.log(`📁 Output directory: ${OUTPUT_DIR}`);
