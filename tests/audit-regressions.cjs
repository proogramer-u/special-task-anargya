/* eslint-disable @typescript-eslint/no-require-imports -- Local browser regressions. */
const assert=require('node:assert/strict');const fs=require('node:fs/promises');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{const b=await chromium.launch({channel:'chrome'});const results=[];try{
 for(const width of [390,440,768,1280,1440,1920]){
  const p=await b.newPage({viewport:{width,height:1100},hasTouch:width<1024});await p.goto('http://127.0.0.1:3001',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  const modified=await p.evaluate(()=>{let a=document.querySelector('.mobile-nav a'),e=new MouseEvent('click',{bubbles:true,cancelable:true,ctrlKey:true});a.dispatchEvent(e);return e.defaultPrevented});assert.equal(modified,false,'Modified anchor navigation retains native behavior');
  assert.equal(await p.getByRole('group',{name:'Choose an achievement'}).count(),1);
  const carousel=p.locator('#track-record');await carousel.scrollIntoViewIfNeeded();const teamY=()=>p.locator('#team').evaluate(n=>n.getBoundingClientRect().top+scrollY);let initialY=await teamY();
  for(let i=0;i<4;i++){await carousel.getByRole('button',{name:'Next achievement',exact:true}).click();await p.waitForFunction(()=>document.querySelector('.carousel-track').dataset.animating==='false');assert(Math.abs(await teamY()-initialY)<.1);assert.equal(await carousel.locator('.carousel-counter').textContent(),`${String((i+1)%3+1).padStart(2,'0')} / 03`);}
  await p.goto('http://127.0.0.1:3001');await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.className),'skip-link');await p.keyboard.press('Enter');assert.equal(await p.evaluate(()=>location.hash),'#main-content');
  let enlargement=null;
  if(width>=768){await p.evaluate(()=>{const ns=[...document.querySelectorAll('body,h1,h2,h3,h4,p,a,dt,dd,button,figcaption,address')];const originals=ns.map(n=>({n,size:parseFloat(getComputedStyle(n).fontSize),line:parseFloat(getComputedStyle(n).lineHeight)}));originals.forEach(({n,size,line})=>{n.style.fontSize=size*2+'px';n.style.lineHeight=line*2+'px'})});enlargement=await p.evaluate(()=>{const r=document.querySelector('.research-feature').getBoundingClientRect(),c=document.querySelector('.research-content').getBoundingClientRect();return {featureHeight:r.height,contentFits:c.bottom<=r.bottom+.5,overflow:document.documentElement.scrollWidth>innerWidth}});assert(enlargement.contentFits);assert.equal(enlargement.overflow,false);if(width===1440)await p.screenshot({path:'docs/final-audit-previews/text-200-after.png',fullPage:true});}
  results.push({width,modifiedLinks:'PASS',indicatorGroup:'PASS',counter:'PASS',noCarouselSectionShift:'PASS',skipLink:'PASS',text200:enlargement});await p.close();
 }
 await fs.writeFile('docs/final-audit-previews/regressions.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
