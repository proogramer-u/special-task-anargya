/* eslint-disable @typescript-eslint/no-require-imports -- This is a native Node CommonJS CLI harness. */
/* Run against a local server. Uses Playwright supplied by the host or installed separately.
   BASE_URL=http://127.0.0.1:3000 PLAYWRIGHT_MODULE=/path/to/playwright node tests/site-check.cjs */
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

async function main() {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const output = path.resolve('docs/implementation-previews');
  await fs.mkdir(output, { recursive: true });
  const report = [];
  try {
    for (const width of [390, 440, 768, 1280, 1440, 1920]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: width < 1024 });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(process.env.BASE_URL || 'http://127.0.0.1:3000', { waitUntil: 'networkidle' });
      await page.getByRole('heading', { level: 1, name: /ANARGYA ITS/ }).waitFor({ timeout: 15000 });
      await page.evaluate(() => document.fonts.ready);
      for (const id of ['about', 'research', 'vehicles', 'track-record', 'team', 'sponsors', 'contact']) {
        assert.equal(await page.locator('#' + id).count(), 1, id + ' section missing');
      }
      if (width < 1024) {
        const toggle = page.getByRole('button', { name: 'Open navigation menu' });
        await toggle.click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
        await page.screenshot({ path: path.join(output, `${width}-menu-open.png`) });
        await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Research', exact: true }).focus();
        await page.keyboard.press('Escape');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        assert(await toggle.evaluate(n => n === document.activeElement), 'Escape restores toggle focus');
        await toggle.click();
        await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Vehicles', exact: true }).click();
        await page.waitForURL('**/vehicles');
        assert.equal(await page.locator('#mark-6').count(), 1);
        await page.goto(process.env.BASE_URL || 'http://127.0.0.1:3003', { waitUntil: 'networkidle' });
      }
      const carousel = page.getByRole('region', { name: 'Track Record achievements' });
      await carousel.scrollIntoViewIfNeeded();
      const prev = carousel.getByRole('button', { name: 'Previous achievement', exact: true });
      const next = carousel.getByRole('button', { name: 'Next achievement', exact: true });
      const settleCarousel = () => page.waitForFunction(() => document.querySelector('.carousel-track').dataset.animating === 'false');
      const selected = () => carousel.getByRole('button', { name: /Show achievement/ }).evaluateAll(nodes => nodes.filter(n => n.getAttribute('aria-current') === 'true').map(n => n.getAttribute('aria-label')));
      assert.match((await selected())[0], /2025/);
      await next.click(); await settleCarousel();
      assert.match((await selected())[0], /2022–2024/);
      await next.click(); await settleCarousel();
      assert.match((await selected())[0], /2023/);
      assert.match((await selected())[0], /2023/);
      await prev.click(); await settleCarousel();
      assert.match((await selected())[0], /2022–2024/);
      await carousel.focus();
      await page.keyboard.press('Home'); await settleCarousel();
      assert.match((await selected())[0], /2025/);
      await page.keyboard.press('ArrowRight'); await settleCarousel();
      assert.match((await selected())[0], /2022–2024/);
      await page.keyboard.press('End'); await settleCarousel();
      assert.match((await selected())[0], /2023/);
      await carousel.getByRole('button', { name: /Show achievement 1:/ }).click(); await settleCarousel();
      assert.match((await selected())[0], /2025/);
      await carousel.locator('.carousel-cards').dispatchEvent('pointerdown', { pointerId: 1, pointerType: 'touch', clientX: 250, clientY: 400, isPrimary: true });
      await carousel.locator('.carousel-cards').dispatchEvent('pointerup', { pointerId: 1, pointerType: 'touch', clientX: 140, clientY: 410, isPrimary: true });
      await settleCarousel();
      assert.match((await selected())[0], /2022–2024/, 'Touch swipe advances');
      await carousel.locator('.carousel-cards').dispatchEvent('pointerdown', { pointerId: 2, pointerType: 'touch', clientX: 200, clientY: 400, isPrimary: true });
      await carousel.locator('.carousel-cards').dispatchEvent('pointerup', { pointerId: 2, pointerType: 'touch', clientX: 210, clientY: 500, isPrimary: true });
      assert.match((await selected())[0], /2022–2024/, 'Vertical gesture must not advance');
      await carousel.getByRole('button', { name: /Show achievement 1:/ }).click(); await settleCarousel();

      if (width < 1024) {
        await carousel.scrollIntoViewIfNeeded();
        const box = await carousel.locator('.carousel-cards').boundingBox();
        const touch = await context.newCDPSession(page);
        const x = box.x + box.width / 2, y = box.y + Math.min(box.height / 2, 150);
        await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x + 60, y }] });
        await touch.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - 60, y: y + 2 }] });
        await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        await settleCarousel();
        await page.waitForFunction(() => document.querySelector('#track-record button[aria-current="true"]').getAttribute('aria-label').includes('2022–2024'));
        await carousel.getByRole('button', { name: /Show achievement 1:/ }).click(); await settleCarousel();
        await touch.detach();
      }

      await page.goto((process.env.BASE_URL || 'http://127.0.0.1:3003') + '/sponsors', { waitUntil: 'networkidle' });
      const tiles = page.locator('.sponsor-tile');
      assert.equal(await tiles.count(), 27, 'Full sponsor inventory preserved');
      for (const tile of await tiles.all()) {
        await tile.scrollIntoViewIfNeeded();
        await tile.locator('img').evaluate(async img => { if (!img.complete) await new Promise(resolve => { img.onload = resolve; img.onerror = resolve; }); });
        const geometry = await tile.evaluate(n => {
          const img = n.querySelector('img'), a = n.getBoundingClientRect(), b = img.getBoundingClientRect();
          return { loaded: img.naturalWidth > 0, fit: getComputedStyle(img).objectFit, contained: b.left >= a.left && b.right <= a.right + .5 && b.top >= a.top && b.bottom <= a.bottom + .5 };
        });
        assert(geometry.loaded && geometry.contained && geometry.fit === 'contain', JSON.stringify(geometry));
      }
      await page.goto(process.env.BASE_URL || 'http://127.0.0.1:3003', { waitUntil: 'networkidle' });
      const anchors = await page.locator('a[href^="#"]').evaluateAll(nodes => nodes.map(n => ({ href: n.getAttribute('href'), exists: !!document.querySelector(n.getAttribute('href')) })));
      assert(anchors.every(n => n.exists), 'Internal navigation destinations exist');
      assert(await page.locator('a[href="mailto:anargya@its.ac.id"]').count() >= 2);
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.waitForLoadState('networkidle');
      await page.evaluate(async () => {
        for (const image of document.images) image.loading = 'eager';
        await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
      });
      assert.equal(await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).length), 0, 'All photographic, logo and interface assets load');
      const overflow = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, offenders: [...document.querySelectorAll('main *')].filter(n => { const r = n.getBoundingClientRect(); return !n.classList.contains('sr-only') && !n.closest('.carousel-track') && r.width && (r.left < -.5 || r.right > innerWidth + .5); }).map(n => n.className).slice(0, 20) }));
      assert(overflow.document <= overflow.viewport, 'Horizontal document overflow: ' + JSON.stringify(overflow));
      assert.equal(overflow.offenders.length, 0, 'Off-frame elements: ' + JSON.stringify(overflow));
      assert.equal(errors.length, 0, 'Browser runtime errors: ' + errors.join(', '));
      for (const section of ['hero', 'research', 'vehicles', 'track-record', 'team', 'sponsors', 'contact']) {
        await page.locator('#' + section).screenshot({ path: path.join(output, `${width}-${section}.png`) });
      }
      await page.screenshot({ path: path.join(output, `${width}-homepage.png`), fullPage: true });
      report.push({ width, status: 'PASS', sponsorCount: 27, overflow, runtimeErrors: errors, carousel: 'buttons, loop positions, indicators, Home/End/arrows, pointer touch and vertical-scroll guard passed', menu: width < 1024 ? 'open, Escape/focus restoration, navigation/close passed' : 'desktop navigation' });
      await context.close();
    }
    await fs.writeFile(path.join(output, 'browser-checks.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
