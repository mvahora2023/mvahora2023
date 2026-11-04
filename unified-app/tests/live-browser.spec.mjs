import { test, expect } from '@playwright/test';
const URL=process.env.UNIFIED_URL||'https://project-lab-unified.vercel.app/';
test('home shows eleven technical module cards while keeping twelve tracked sources', async({page})=>{
 await page.goto(URL);
 await expect(page.locator('#headerState')).toContainText('11 modules · 12 sources');
 await expect(page.locator('.tile')).toHaveCount(11);
 await expect(page.getByRole('heading',{name:'All modules'})).toBeVisible();
 await expect(page.locator('input[type=file]')).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Portfolio Index'})).toHaveCount(0);
 await expect(page.getByText('Portfolio Index',{exact:true})).toHaveCount(0);
});
test('category filtering cannot leak cards from another module area', async({page})=>{
 await page.goto(URL);
 await expect(page.locator('.tile')).toHaveCount(11);
 await page.getByRole('button',{name:'Cybersecurity & OT'}).click();
 await expect(page.locator('.tile')).toHaveCount(2);
 await expect(page.getByText('Mini SOC Lab',{exact:true})).toBeVisible();
 await expect(page.getByText('ICS/OT Risk Assessment',{exact:true})).toBeVisible();
 await expect(page.getByText('Compliance Gap Tracker',{exact:true})).toHaveCount(0);
});
test('opens and verifies a copied dashboard in an opaque-origin frame',async({page})=>{
 await page.goto(URL);
 await expect(page.locator('.tile')).toHaveCount(11);
 await page.locator('.tile').filter({hasText:'Compliance Gap Tracker'}).getByRole('button',{name:'Open in Unified'}).click();
 await expect(page.locator('#viewerTitle')).toContainText('Compliance Gap Tracker');
 const frame=page.locator('#frameArea iframe');
 await expect(frame).toHaveCount(1);
 await expect(frame).not.toHaveAttribute('sandbox',/allow-same-origin/);
 await expect(frame).toHaveAttribute('sandbox',/allow-scripts/);
 await expect(page.frameLocator('#frameArea iframe').locator('body')).toContainText('Compliance Gap Tracker');
 await expect(page.locator('#moduleDetails')).toContainText('Revision');
 await page.getByRole('button',{name:'Back to projects'}).click();
 await expect(page.locator('#frameArea iframe')).toHaveCount(0);
});
test('release status shows all twelve source revisions',async({page})=>{
 await page.goto(URL);
 await page.getByRole('button',{name:'Release & sync status'}).click();
 await expect(page.locator('#syncRows tr')).toHaveCount(12);
 await expect(page.locator('#syncNote')).toContainText('Release generated');
});

// A legacy deep link to the profile repository should return to the module catalog.
test('portfolio-source deep link does not open a nested Project Lab',async({page})=>{
 await page.goto(URL+'?module=mvahora2023');
 await expect(page.locator('.tile')).toHaveCount(11);
 await expect(page.locator('#frameArea iframe')).toHaveCount(0);
 await expect(page).not.toHaveURL(/module=mvahora2023/);
});


test('Unified presentation removes duplicate headers and expands the module within one page scroll',async({page})=>{
 await page.goto(URL);
 await page.locator('.tile').filter({hasText:'Mini SOC Lab'}).getByRole('button',{name:'Open in Unified'}).click();
 const frame=page.locator('#frameArea iframe');
 await expect(frame).toHaveCount(1);
 await expect(frame).toHaveAttribute('src',/unified=1/);
 await expect(page.frameLocator('#frameArea iframe').locator('html')).toHaveAttribute('data-unified-embed','1');
 await expect(page.frameLocator('#frameArea iframe').locator('header.topbar')).toBeHidden();
 await expect(page.frameLocator('#frameArea iframe').locator('section.hero h1')).toBeHidden();
 await expect(page.frameLocator('#frameArea iframe').locator('section.hero .actions')).toBeVisible();
 await expect.poll(async()=>Number.parseInt(await frame.evaluate(el=>el.style.height),10),{timeout:12000}).toBeGreaterThan(700);
 await expect(page.frameLocator('#frameArea iframe').locator('body')).toHaveCSS('overflow-y','hidden');
});
test('Unified can retrieve actual CISA records without replacing synthetic detection metrics',async({page})=>{
 await page.goto(URL);
 await page.locator('.tile').filter({hasText:'Mini SOC Lab'}).getByRole('button',{name:'Open in Unified'}).click();
 const frame=page.frameLocator('#frameArea iframe');
 const original=await frame.locator('#metrics').innerText();
 await frame.getByRole('button',{name:'Load public references'}).click();
 await expect(frame.locator('#public-data-modes .pd-state')).toContainText('real public reference entries',{timeout:27000});
 await expect(frame.locator('#public-data-modes .pd-item').first()).toBeVisible();
 expect(await frame.locator('#metrics').innerText()).toBe(original);
 await expect(page.locator('input[type=file]')).toHaveCount(0);
});
