import { test, expect } from '@playwright/test';

/*
test('has title', async ({ page }) => {
  // await page.goto('http://localhost:8100/');
  await page.goto('https://playwright.dev/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
*/
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test('HAS TITLE', async ({ page }) => {
  await page.goto('http://localhost:8100/');
  await expect(page).toHaveTitle(/RollCall/);
});


test('Dashboard Classes', async ({ page }) => {
  await page.goto('http://localhost:8100/app/dashboard/view');
  const cs192CardTitle = await page.textContent('ion-card:nth-child(2) ion-card-title');
  expect(cs192CardTitle).toContain('CS 192');

  const cs192CardSubtitle = await page.textContent('ion-card:nth-child(2) ion-card-subtitle');
  expect(cs192CardSubtitle).toContain('Software Engineering II');

  const cs145CardTitle = await page.textContent('ion-card:nth-child(3) ion-card-title');
  expect(cs145CardTitle).toContain('CS 145');

  const cs145CardSubtitle = await page.textContent('ion-card:nth-child(3) ion-card-subtitle');
  expect(cs145CardSubtitle).toContain('Computer Networks');
});

test('Navigate to Scan tab', async ({ page }) => {
  await page.goto('http://localhost:8100/app/dashboard/view');

  const scanTabButton = await page.$('ion-tab-button[tab="tab2"]');
  await scanTabButton!.click();
  const currentUrl = page.url();
  expect(currentUrl).toContain('/app/dashboard/scan');
});

test('Navigate to Profile tab', async ({ page }) => {
  await page.goto('http://localhost:8100/app/dashboard/view');

  const scanTabButton = await page.$('ion-tab-button[tab="tab3"]');
  await scanTabButton!.click();
  const currentUrl = page.url();
  expect(currentUrl).toContain('/app/dashboard/profile');
});

