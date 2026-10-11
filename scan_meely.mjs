import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function scan() {
  const screenshotsDir = path.resolve('public', 'scans');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Launching Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const consoleLogs = [];
  const errors = [];

  page.on('console', (msg) => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', (err) => {
    errors.push(err.toString());
  });

  console.log('Navigating to http://localhost:5173/meely...');
  await page.goto('http://localhost:5173/meely', { waitUntil: 'networkidle', timeout: 30000 });

  // 1. Hero Section
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, '1_hero.png') });
  console.log('Saved 1_hero.png');

  // 2. Scroll into Phase 1 Tour (Frames 0..47)
  await page.evaluate(() => {
    window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, '2_phase1_canvas.png') });
  console.log('Saved 2_phase1_canvas.png');

  // 3. Scroll into Parallax Snap Section (Lobby BG + Reception Desk FG)
  await page.evaluate(() => {
    window.scrollTo({ top: window.innerHeight * 4.6, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, '3_parallax_snap.png') });
  console.log('Saved 3_parallax_snap.png');

  // 4. Scroll into Phase 2 Tour (Frames 48..98)
  await page.evaluate(() => {
    window.scrollTo({ top: window.innerHeight * 7.8, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, '4_phase2_canvas.png') });
  console.log('Saved 4_phase2_canvas.png');

  // 5. Scroll to Outro Section
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, '5_outro.png') });
  console.log('Saved 5_outro.png');

  // Diagnostic Data
  const metrics = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas')).map((c, i) => ({
      index: i,
      width: c.width,
      height: c.height,
      clientWidth: c.clientWidth,
      clientHeight: c.clientHeight,
    }));

    const images = Array.from(document.querySelectorAll('img')).map((img) => ({
      src: img.src.split('/').pop(),
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));

    const sections = Array.from(document.querySelectorAll('section')).map((s, idx) => ({
      index: idx,
      classes: s.className,
      offsetTop: s.offsetTop,
      offsetHeight: s.offsetHeight,
    }));

    return {
      title: document.title,
      scrollHeight: document.body.scrollHeight,
      canvases,
      images,
      sections,
    };
  });

  console.log('\n=== DIAGNOSTICS ===');
  console.log(JSON.stringify(metrics, null, 2));

  console.log('\n=== CONSOLE LOGS ===');
  console.log(consoleLogs);

  console.log('\n=== PAGE ERRORS ===');
  console.log(errors.length === 0 ? 'None (Clean)' : errors);

  await browser.close();
  console.log('\nScan complete!');
}

scan().catch((err) => {
  console.error('Scan error:', err);
  process.exit(1);
});
