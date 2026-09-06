// Build-time asset generator — run by hand (`pnpm run generate:assets`), not
// part of the production build, since these are committed static files.
//
// Produces the favicon set, the mark/wordmark logo lockups, and the default
// OG image, all from the token values in styles/globals.css (kept in sync by
// hand — there is no CSS-in-JS bridge on this stack). `sharp` is a
// devDependency only; nothing here ships to the client bundle.
//
// Known limitation: sharp rasterises SVG <text> through its bundled librsvg,
// which resolves font-family against system fontconfig, not this repo's
// self-hosted woff2 files. The OG image below therefore falls back to the
// nearest installed serif/sans on the machine that runs this script rather
// than guaranteeing exact Fraunces/IBM Plex Sans glyphs. Layout, colour and
// copy are exact; typeface fidelity is not. Re-run after installing the
// fonts locally, or swap in a text-to-path tool, if pixel-perfect brand
// match is required before this ships to a design review.
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PUBLIC = join(process.cwd(), 'public');
mkdirSync(PUBLIC, { recursive: true });

const INK = '#171B21';
const ACCENT = '#A63D26';
const BG = '#FFFFFF';
const MUTED_ON_DARK = '#8C939D';

/** The three-bar ascending mark, viewBox 0 0 32 32. `tall` controls the
 *  tallest bar's treatment: 'accent' (fill) or 'reversed' (white fill, accent
 *  stroke, for legibility on an ink or accent background). */
function markSvg({ bar1 = INK, bar2 = INK, tall = 'accent' }) {
  const tallBar =
    tall === 'accent'
      ? `<rect x="22" y="2" width="6" height="28" rx="1" fill="${ACCENT}"/>`
      : `<rect x="22" y="2" width="6" height="28" rx="1" fill="#FFFFFF" stroke="${ACCENT}" stroke-width="1"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect x="4" y="18" width="6" height="12" rx="1" fill="${bar1}"/>
  <rect x="13" y="10" width="6" height="20" rx="1" fill="${bar2}"/>
  ${tallBar}
</svg>`;
}

const markLight = markSvg({ bar1: INK, bar2: INK, tall: 'accent' });
const markReversed = markSvg({ bar1: '#FFFFFF', bar2: '#FFFFFF', tall: 'reversed' });

// ── Favicon ────────────────────────────────────────────────────────────────
writeFileSync(join(PUBLIC, 'favicon.svg'), markLight);

// ── Logo lockups (SVG, hand-naming per the design brief) ───────────────────
const wordmarkLight = `<text x="42" y="24" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="22" fill="${INK}">Immi<tspan fill="${INK}">Stack</tspan></text>`;
const wordmarkReversed = `<text x="42" y="24" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="22" fill="#FFFFFF">Immi<tspan fill="#FFFFFF">Stack</tspan></text>`;

function horizontalSvg(mark, wordmark, width = 210) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 32" height="32">
  <g transform="scale(0.9)">${mark.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">', '<g>').replace('</svg>', '</g>')}</g>
  ${wordmark}
</svg>`;
}

writeFileSync(join(PUBLIC, 'immistack-logo-mark.svg'), markLight);
writeFileSync(join(PUBLIC, 'immistack-logo-horizontal.svg'), horizontalSvg(markLight, wordmarkLight));
writeFileSync(join(PUBLIC, 'immistack-logo-reversed.svg'), horizontalSvg(markReversed, wordmarkReversed));

async function run() {
  // Favicon rasters
  await sharp(Buffer.from(markLight)).resize(32, 32).png().toFile(join(PUBLIC, 'favicon-32.png'));
  await sharp(Buffer.from(markLight)).resize(16, 16).png().toFile(join(PUBLIC, 'favicon-16.png'));

  // Apple touch icon — white background, mark centred with ~20% padding.
  const markPng = await sharp(Buffer.from(markLight)).resize(128, 128).png().toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: BG } })
    .composite([{ input: markPng, left: 26, top: 26 }])
    .png()
    .toFile(join(PUBLIC, 'apple-touch-icon.png'));

  // logo.png — Organization.logo raster, 512x512, white background, mark
  // centred (schema.org expects a real, reasonably square raster).
  const markPngLarge = await sharp(Buffer.from(markLight)).resize(320, 320).png().toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 4, background: BG } })
    .composite([{ input: markPngLarge, left: 96, top: 96 }])
    .png()
    .toFile(join(PUBLIC, 'logo.png'));

  // @2x PNG exports of the lockups at 512px height, for surfaces that reject SVG.
  await sharp(Buffer.from(horizontalSvg(markLight, wordmarkLight)))
    .resize({ height: 512 })
    .png()
    .toFile(join(PUBLIC, 'immistack-logo-horizontal@2x.png'));
  await sharp(Buffer.from(horizontalSvg(markReversed, wordmarkReversed)))
    .resize({ height: 512 })
    .flatten({ background: INK })
    .png()
    .toFile(join(PUBLIC, 'immistack-logo-reversed@2x.png'));
  await sharp(Buffer.from(markLight)).resize({ height: 512 }).png().toFile(join(PUBLIC, 'immistack-logo-mark@2x.png'));

  // og-default.png — 1200x630, ink background, reversed mark + wordmark,
  // headline + subline. Per Elena's spec §5: no gradient, no stock photo, no
  // device mockup, no fake screenshot at this size.
  const ogMark = await sharp(Buffer.from(markReversed)).resize(72, 72).png().toBuffer();
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="${INK}"/>
    <text x="220" y="290" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="52" fill="#FFFFFF">Immigration case management,</text>
    <text x="220" y="352" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="52" fill="#FFFFFF">built to be checked.</text>
    <text x="220" y="410" font-family="Arial, sans-serif" font-weight="400" font-size="26" fill="${MUTED_ON_DARK}">For registered migration agents. AU &#183; CA &#183; UK &#183; NZ.</text>
  </svg>`;
  await sharp(Buffer.from(ogSvg))
    .composite([{ input: ogMark, left: 120, top: 279 }])
    .png({ quality: 90 })
    .toFile(join(PUBLIC, 'og-default.png'));

  console.log('✓ generated favicon set, logo lockups and og-default.png in public/');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
