/* eslint-disable @typescript-eslint/no-require-imports -- Local browser QA harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  await fs.mkdir('docs/navigation-previews', { recursive: true });
  const report = [];
  try {
    for (const width of [390, 440, 768]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: true });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(process.env.BASE_URL || 'http://127.0.0.1:3001', { waitUntil: 'networkidle' });
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 1200); });
      const before = await page.evaluate(() => ({ y: scrollY, x: document.querySelector('#about').getBoundingClientRect().x }));
      const trigger = page.getByRole('button', { name: 'Open navigation menu', exact: true });
      await trigger.evaluate(n => n.click());
      const dialog = page.getByRole('dialog', { name: 'Navigation menu' });
      await dialog.waitFor();
      await page.waitForFunction(() => getComputedStyle(document.querySelector('dialog')).opacity === '1');
      const box = await dialog.boundingBox();
      assert(Math.abs(box.x) < .1 && Math.abs(box.y) < .1 && Math.abs(box.width - width) < .1 && Math.abs(box.height - 900) < .1, "Dialog fills viewport");
      assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
      const links = dialog.getByRole('navigation').getByRole('link');
      assert.deepEqual(await links.allTextContents(), ['About', 'Research', 'Vehicles', 'Team', 'Contact']);
      const alignment = await links.evaluateAll(ns => ns.map(n => n.getBoundingClientRect().left));
      assert(alignment.every(x => x === alignment[0]));
      assert.equal(await dialog.evaluate(n => getComputedStyle(n).backgroundColor), 'rgb(0, 0, 0)');
      assert.equal(await dialog.getByRole('button', { name: 'Close navigation menu' }).evaluate(n => n === document.activeElement), true);
      await links.last().focus(); await page.keyboard.press('Tab');
      assert(await dialog.getByRole('link', { name: 'Anargya ITS — home' }).evaluate(n => n === document.activeElement));
      await page.keyboard.press('Shift+Tab');
      assert(await links.last().evaluate(n => n === document.activeElement));
      await page.mouse.wheel(0, 700);
      assert.equal(await page.evaluate(() => document.body.style.top), '-1200px');
      assert.equal(await page.evaluate(() => document.body.style.position), 'fixed');
      assert.equal(await page.evaluate(() => document.querySelector('#about').getBoundingClientRect().x), before.x);
      await page.waitForTimeout(350); // Allow the wheel event and menu transition to settle.
      assert((await dialog.locator(".brand").boundingBox()).y >= 0, "Logo stays within viewport");
      await page.screenshot({ path: `docs/navigation-previews/${width}-menu.png` });
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('dialog').open);
      assert.equal(await page.evaluate(() => scrollY), before.y);
      assert(await trigger.evaluate(n => n === document.activeElement));
      await trigger.evaluate(n => n.click());
      await dialog.getByRole('button', { name: 'Close navigation menu' }).click();
      await page.waitForFunction(() => !document.querySelector('dialog').open);
      assert.equal(await page.evaluate(() => scrollY), before.y);
      assert(await trigger.evaluate(n => n === document.activeElement));
      await trigger.evaluate(n => n.click());
      await dialog.getByRole('link', { name: 'Vehicles', exact: true }).click();
      await page.waitForFunction(() => location.hash === '#vehicles' && document.body.style.position !== 'fixed');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'vehicles');
      await page.goBack();
      await trigger.evaluate(n => n.click());
      assert.equal(await dialog.locator('a[aria-current]').count(), 0, 'Back clears obsolete selected link');
      await page.keyboard.press('Escape');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await trigger.evaluate(n => n.click());
      assert.equal(await dialog.evaluate(n => getComputedStyle(n).transitionDuration), '0s');
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForFunction(() => !document.querySelector('dialog').open && document.body.style.position !== 'fixed');
      assert.equal(await page.locator('.desktop-nav').isVisible(), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(errors, []);
      report.push({ width, fullscreen: 'PASS', plainAlignedLinks: 'PASS', scrollLockRestore: 'PASS', focusEscapeCloseAnchor: 'PASS', resizeReducedMotion: 'PASS' });
      await context.close();
    }
    await fs.writeFile('docs/navigation-previews/results.json', JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
