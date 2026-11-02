import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir, stat, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { extname } from 'node:path';

const manifest = {};
let before = 0, after = 0;
await mkdir('public/media', { recursive: true });
for (const file of await readdir('public/media')) {
  if (/\.(?:avif|webp)$/i.test(file)) await unlink(`public/media/${file}`);
}

const inputs = [];
for (const folder of ['gallery', 'originals']) {
  for (const file of await readdir(`assets/source-images/${folder}`)) {
    if (!/\.(?:jpe?g|png|webp)$/i.test(file)) continue;
    inputs.push({ folder, file, input: `assets/source-images/${folder}/${file}` });
  }
}
inputs.push({ folder: 'root', file: 'yankee-lady-logo.png', input: 'assets/source-images/root/yankee-lady-logo.png' });
inputs.push({ folder: 'root', file: 'og.png', input: 'public/og.png' });

for (const { folder, file, input } of inputs) {
  console.log(`Optimizing ${input}`);
  try {
    const bytes = await readFile(input);
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10);
    const metadata = await sharp(bytes, { failOn: 'none' }).metadata();
    const webp = [];
    const avif = [];
    for (const width of [480, 960, 1600]) {
      const stem = `${folder}-${file.slice(0, -extname(file).length)}`.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
      const webpName = `${stem}-${hash}-${width}.webp`;
      const avifName = `${stem}-${hash}-${width}.avif`;
      const pipeline = sharp(bytes, { failOn: 'none' }).rotate().resize({ width, withoutEnlargement: true });
      const webpResult = await pipeline.clone().webp({ quality: 64, effort: 6, smartSubsample: true }).toFile(`public/media/${webpName}`);
      const avifResult = await pipeline.clone().avif({ quality: 45, effort: 6, chromaSubsampling: '4:2:0' }).toFile(`public/media/${avifName}`);
      if (!webp.some(item => item.width === webpResult.width)) webp.push({ src: `/media/${webpName}`, width: webpResult.width });
      if (!avif.some(item => item.width === avifResult.width)) avif.push({ src: `/media/${avifName}`, width: avifResult.width });
      if (width === 1600) after += webpResult.size + avifResult.size;
    }
    before += (await stat(input)).size;
    const key = folder === 'root' ? `/${file}` : `/${folder}/${file}`;
    manifest[key] = {
      width: metadata.width,
      height: metadata.height,
      src: webp.at(-1).src,
      srcSet: webp.map(item => `${item.src} ${item.width}w`).join(', '),
      avifSrc: avif.at(-1).src,
      avifSrcSet: avif.map(item => `${item.src} ${item.width}w`).join(', '),
      small: webp[0].src,
      medium: webp[Math.min(1, webp.length - 1)].src,
    };
  } catch (error) {
    throw new Error(`Failed to optimize ${input}`, { cause: error });
  }
}
await writeFile('app/media-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ sources: inputs.length, originalBytes: before, optimizedLargestBytes: after }));
