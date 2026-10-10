/* eslint-disable @typescript-eslint/no-require-imports -- Standalone local audit harness. */
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 const out='docs/final-audit-previews'; await fs.mkdir(out,{recursive:true});
 const results=[];
 try {
  for(const width of [390,440,768,1280,1440,1920,320]) {
   const page=await browser.newPage({viewport:{width,height:1100},hasTouch:width<1024});
   const errors=[],failures=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:3001')&&r.status()>=400) failures.push({url:r.url(),status:r.status()});});
   await page.addInitScript(()=>{
    window.auditVitals={cls:0,lcp:0};
    new PerformanceObserver(list=>{for(const e of list.getEntries()) if(!e.hadRecentInput) window.auditVitals.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
    new PerformanceObserver(list=>{for(const e of list.getEntries()) window.auditVitals.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
   });
   await page.goto('http://127.0.0.1:3001',{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   const initial=await page.evaluate(()=>({vitals:window.auditVitals,navigation:performance.getEntriesByType('navigation')[0].toJSON(),resources:performance.getEntriesByType('resource').map(r=>({name:r.name,transferSize:r.transferSize,duration:r.duration}))}));
   await page.evaluate(async()=>{for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
   await page.addScriptTag({path:process.env.AXE_PATH||'/tmp/anargya-axe.min.js'});
   const axe=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return {violations:r.violations,incomplete:r.incomplete,passes:r.passes.length};});
   const dom=await page.evaluate(()=>{
    const rect=n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};
    return {
     width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
     sections:[...document.querySelectorAll('main>section,footer')].map(n=>({id:n.id||'footer',...rect(n)})),
     headings:[...document.querySelectorAll('h1,h2,h3,h4')].filter(n=>n.getBoundingClientRect().height>0&&!n.closest('[aria-hidden="true"]')).map(n=>({tag:n.tagName,text:n.textContent,...rect(n)})),
     images:[...document.images].map(n=>({alt:n.getAttribute('alt'),loaded:n.complete&&n.naturalWidth>0,src:n.currentSrc,fit:getComputedStyle(n).objectFit,loading:n.loading})),
     links:[...document.querySelectorAll('a[href]')].map(n=>({label:n.textContent||n.getAttribute('aria-label'),href:n.getAttribute('href'),target:n.target})),
     unnamed:[...document.querySelectorAll('a,button')].filter(n=>!n.textContent.trim()&&!n.getAttribute('aria-label')&&!n.querySelector('img[alt]:not([alt=""])')).map(n=>n.outerHTML),
     clippedText:[...document.querySelectorAll('h1,h2,h3,h4,p,dt,dd,a')].filter(n=>{if(n.closest('.carousel-track,dialog')||n.classList.contains('sr-only')||!n.getBoundingClientRect().width)return false;return n.scrollWidth>n.clientWidth+1||n.scrollHeight>n.clientHeight+1}).map(n=>({text:n.textContent,tag:n.tagName,cls:n.className})),
     missingAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(n=>!document.getElementById(n.hash.slice(1))).map(n=>n.hash),
     tiles:[...document.querySelectorAll('.sponsor-tile')].map(n=>({name:n.querySelector('p').textContent,fit:getComputedStyle(n.querySelector('img')).objectFit,...rect(n)})),
    };
   });
   assert.equal(dom.scrollWidth,width,'No horizontal page overflow');
   assert(dom.images.every(i=>i.loaded&&i.alt!==null),'All images load and have alternatives');
   assert.equal(dom.tiles.length,27);assert(dom.tiles.every(t=>t.name&&t.fit==='contain'));
   assert.deepEqual(dom.missingAnchors,[]);assert.deepEqual(dom.unnamed,[]);
   assert.equal(dom.headings.filter(h=>h.tag==='H1').length,1);
   assert(dom.sections[1].y>=1100-1,'Hero contains initial viewport');
   for(let i=1;i<dom.sections.length;i++)assert(dom.sections[i].y>=dom.sections[i-1].y+dom.sections[i-1].height-1,'Sections do not overlap');
   await page.screenshot({path:`${out}/${width}-full.png`,fullPage:true});
   if(width===390||width===1440) for(const id of ['hero','about','research','vehicles','track-record','team','sponsors','contact'])await page.locator('#'+id).screenshot({path:`${out}/${width}-${id}.png`});
   // Menu open state gets a separate accessibility scan.
   let menuAxe=null;
   if(width<1024){await page.getByRole('button',{name:'Open navigation menu'}).evaluate(n=>n.click());await page.waitForFunction(()=>getComputedStyle(document.querySelector('dialog')).opacity==='1');menuAxe=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return {violations:r.violations,incomplete:r.incomplete.map(n=>n.id)};});await page.keyboard.press('Escape');}
   results.push({width,dom,axe,menuAxe,initial,errors,failures});
   assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
   console.log(JSON.stringify({width,violations:axe.violations.map(n=>({id:n.id,nodes:n.nodes.map(n=>n.target)})),menuViolations:menuAxe?.violations.map(n=>n.id),incomplete:axe.incomplete.map(n=>n.id),clippedText:dom.clippedText,sections:dom.sections,initialVitals:initial.vitals}));
   await page.close();
  }
  await fs.writeFile(`${out}/results.json`,JSON.stringify(results,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
