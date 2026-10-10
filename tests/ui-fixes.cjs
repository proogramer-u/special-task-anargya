/* eslint-disable @typescript-eslint/no-require-imports -- Native Node CLI harness. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  const output = 'docs/ui-fix-previews';
  await fs.mkdir(output, { recursive: true });
  try {
    for (const width of [1440, 768, 390, 440]) {
      const context = await browser.newContext({ viewport: { width, height: 1100 }, hasTouch: width < 1024 });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(process.env.BASE_URL || 'http://127.0.0.1:3001', { waitUntil: 'networkidle' });
      await page.evaluate(async () => { await document.fonts.ready; for (const i of document.images) i.loading = 'eager'; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); });
      const about = await page.locator('#about').evaluate(n => n.getBoundingClientRect().top);
      assert(about >= 1100 - 1, 'About intrudes into initial viewport');
      const tiles = await page.locator('.sponsor-tile').evaluateAll(nodes => nodes.map(n => ({ name: n.querySelector('p').textContent.trim(), x: n.getBoundingClientRect().x, y: n.getBoundingClientRect().y, loaded: n.querySelector('img')?.naturalWidth > 0, fit: getComputedStyle(n.querySelector('img')).objectFit })));
      assert.equal(tiles.length, 27);
      assert.equal(new Set(tiles.map(t => t.name)).size, 27);
      assert(tiles.every(t => t.name && t.loaded && t.fit === 'contain'));
      if (width < 640) for (let i = 0; i < 26; i += 2) assert(Math.abs(tiles[i].y - tiles[i + 1].y) < 1, 'Mobile grid hole before final row');

      const carousel = page.locator('#track-record');
      await carousel.scrollIntoViewIfNeeded();
      const track = carousel.locator('.carousel-track');
      const mounted = await track.locator('article').count();
      const x = () => track.evaluate(n => new DOMMatrix(getComputedStyle(n).transform).m41);
      const settle = () => page.waitForFunction(() => document.querySelector('.carousel-track').dataset.animating === 'false');
      const next = carousel.getByRole('button', { name: 'Next achievement', exact: true });
      const prev = carousel.getByRole('button', { name: 'Previous achievement', exact: true });
      const selected = () => carousel.locator('button[aria-current="true"]').getAttribute('aria-label');
      const before = await x();
      await next.click();
      await page.waitForFunction(start => {
        const n = document.querySelector('.carousel-track');
        const value = new DOMMatrix(getComputedStyle(n).transform).m41;
        const target = new DOMMatrix(n.style.transform).m41;
        return value < start - 1 && value > target + 1;
      }, before);
      const mid = await x();
      await page.screenshot({ path: `${output}/${width}-carousel-moving.png` });
      await settle();
      const after = await x();
      assert(before > mid && mid > after, `Track must visibly move, not replace or fade: ${width}px ${before} / ${mid} / ${after}`);
      assert.equal(await track.locator('article').count(), mounted, 'Mounted cards preserved');
      await next.click(); await settle(); assert.match(await selected(), /2023/);
      await next.click(); await settle(); assert.match(await selected(), /2025/);
      await prev.click(); await settle(); assert.match(await selected(), /2023/);
      await carousel.focus(); await page.keyboard.press('Home'); await settle(); assert.match(await selected(), /2025/);
      await page.keyboard.press('ArrowRight'); await settle(); assert.match(await selected(), /2022–2024/);
      await page.keyboard.press('End'); await settle(); assert.match(await selected(), /2023/);
      await track.evaluate(() => { const button = document.querySelector('#track-record button[aria-label="Next achievement"]'); for (let i = 0; i < 12; i++) button.click(); });
      await page.waitForTimeout(1400); await settle();
      assert(await track.evaluate(n => Number(n.style.getPropertyValue('--slide-position')) >= 1 && Number(n.style.getPropertyValue('--slide-position')) <= 3), 'Rapid input leaves canonical state');
      await carousel.getByRole('button', { name: /Show achievement 1:/ }).click(); await settle();
      await carousel.locator('.carousel-viewport').dispatchEvent('pointerdown', { pointerId: 1, pointerType: 'touch', clientX: 250, clientY: 400 });
      await carousel.locator('.carousel-viewport').dispatchEvent('pointerup', { pointerId: 1, pointerType: 'touch', clientX: 120, clientY: 405 });
      await settle(); assert.match(await selected(), /2022–2024/);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await next.click();
      assert.match(await selected(), /2023/);
      assert.equal(await track.evaluate(n => getComputedStyle(n).transitionDuration), '0s');
      await carousel.getByRole('button', { name: /Show achievement 1:/ }).click();
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.equal(errors.length, 0);
      await page.locator('#hero').screenshot({ path: `${output}/${width}-hero.png` });
      await carousel.screenshot({ path: `${output}/${width}-carousel.png` });
      await page.locator('#sponsors').screenshot({ path: `${output}/${width}-sponsors.png` });
      results.push({ width, about, sponsors: 27, motion: { before, mid, after }, mountedCards: mounted, loop: 'both directions PASS', rapid: 'PASS', keyboard: 'PASS', pointerSwipe: 'PASS', reducedMotion: 'PASS', errors });
      await context.close();
    }
    // Force a real asset failure: the legitimate record must remain with its name.
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.route('**/*', route => route.request().url().includes('sponsor-ipg') ? route.abort() : route.continue());
    await page.goto(process.env.BASE_URL || 'http://127.0.0.1:3001');
    const tile = page.locator('.sponsor-tile').filter({ hasText: 'IPG Automotive' });
    await tile.scrollIntoViewIfNeeded();
    await tile.locator('.logo-fallback').waitFor();
    assert.equal(await tile.locator('.logo-fallback').textContent(), 'IPG Automotive');
    assert.equal(await page.locator('.sponsor-tile').count(), 27);
    await tile.screenshot({ path: `${output}/missing-logo-fallback.png` });
    await page.close();
    await fs.writeFile(`${output}/results.json`, JSON.stringify({ results, missingLogoFallback: 'PASS' }, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
