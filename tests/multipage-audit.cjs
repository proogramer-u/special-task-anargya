/* eslint-disable @typescript-eslint/no-require-imports -- Local browser QA harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:3003';
const routes = (process.env.ROUTES || '/,/team,/vehicles,/achievements,/research,/sponsors').split(',');
const widths = (process.env.WIDTHS || '390,440,768,1280,1440,1920').split(',').map(Number);
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  const output = 'docs/completion-previews';
  await fs.mkdir(output, { recursive: true });
  try {
    for (const route of routes) for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, hasTouch: width < 1024, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('h1').count(), 1);
      const header = await page.locator('body header').first().boundingBox();
      const title = await page.locator('h1').boundingBox();
      assert(header.y + header.height <= title.y + 1, 'Header overlaps page heading');
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('main img').all()) {
        if (!(await image.isVisible())) continue;
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(image => image.decode());
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}/${width} overflow`);
      const clipped = await page.locator('main h1, main h2, main h3, main h4, main h5, main p, main dd').evaluateAll(elements => elements.filter(element => !element.classList.contains("sr-only") && element.getBoundingClientRect().width && element.scrollWidth > element.clientWidth + 1).map(element => element.textContent));
      assert.deepEqual(clipped, [], 'Clipped text');
      if (route === '/sponsors') {
        assert.equal(await page.locator('.sponsor-tile').count(), 27);
        assert.equal(await page.locator('.sponsor-tile img').evaluateAll(images => images.filter(image => getComputedStyle(image).objectFit !== 'contain').length), 0);
      }
      if (route === '/vehicles') for (const id of ['mark-6','mark-5','mark-4']) assert.equal(await page.locator('#' + id).count(), 1);
      if (!process.env.INTERNAL_PHASE) {
        for (const link of await page.locator('a[href^="#"]').all()) {
          const href = await link.getAttribute('href');
          assert.equal(await page.locator(href).count(), 1, `Missing anchor ${href}`);
        }
        assert.equal(await page.locator('.desktop-nav a[aria-current="page"]').count(), route === '/' ? 0 : 1);
        if (width < 1024) {
          const trigger = page.getByRole('button', { name: 'Open navigation menu' });
          await page.evaluate(() => scrollTo(0, 300));
          const before = await page.evaluate(() => scrollY);
          await trigger.evaluate(button => button.click());
          const dialog = page.getByRole('dialog');
          assert(await dialog.isVisible());
          assert.equal(await page.evaluate(() => document.body.style.position), 'fixed');
          assert.equal(await dialog.evaluate(element => Math.round(element.getBoundingClientRect().width)), width);
          assert.equal(await dialog.evaluate(element => Math.round(element.getBoundingClientRect().height)), 1000);
          assert.deepEqual(await page.locator('.mobile-nav a').allTextContents(), ['Team','Vehicles','Achievements','Research','Sponsors']);
          await page.keyboard.press('Escape');
          assert(!(await dialog.isVisible()));
          assert.equal(await page.evaluate(() => scrollY), before);
          assert(await trigger.evaluate(element => element === document.activeElement));
          await trigger.click();
          await page.getByRole('button', { name: 'Close navigation menu' }).click();
          assert(!(await dialog.isVisible()));
          await trigger.click();
          await page.locator('.mobile-nav a').filter({ hasText: 'Vehicles' }).click();
          await page.waitForURL('**/vehicles');
          await page.waitForFunction(() => document.body.style.position !== 'fixed');
          assert.equal(await page.evaluate(() => document.body.style.position), '');
          await page.goto(base + route, { waitUntil: 'networkidle' });
        }
        if (process.env.AXE_SCRIPT) {
          await page.addScriptTag({ path: process.env.AXE_SCRIPT });
          const violations = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa','wcag22aa'] } })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
          assert.deepEqual(violations, [], 'Accessibility violations');
        }
      }
      if ([390,768,1440].includes(width)) {
        await page.evaluate(() => scrollTo(0,0));
        const name = route === '/' ? 'home' : route.slice(1);
        await page.screenshot({ path: path.join(output, `${name}-${width}-opening.png`) });
        await page.screenshot({ path: path.join(output, `${name}-${width}-full.png`), fullPage: true });
      }
      assert.deepEqual(errors, [], 'Runtime errors');
      results.push({ route, width, status: 'PASS' });
      await page.close();
    }
    await fs.writeFile(path.join(output, `audit-${routes.length === 1 ? routes[0].slice(1) || 'home' : 'all'}.json`), JSON.stringify(results, null, 2));
    console.log(results);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
