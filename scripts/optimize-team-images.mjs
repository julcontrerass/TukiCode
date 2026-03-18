import sharp from 'sharp';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public/images/team');

const images = [
  'JulianContreras',
  'Juan',
  'Alejandro',
];

for (const name of images) {
  const input = `${publicDir}/${name}.png`;
  const output = `${publicDir}/${name}.webp`;

  if (!existsSync(input)) {
    console.warn(`Skipping ${name}.png (not found)`);
    continue;
  }

  await sharp(input)
    .resize(200, 200, { fit: 'cover', position: 'center' })
    .webp({ quality: 80 })
    .toFile(output);

  console.log(`✓ ${name}.webp (200x200)`);
}
