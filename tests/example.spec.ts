import { test, expect } from '@playwright/test';

/*
test('has title', async ({ page }) => {
  // await page.goto('/');
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

test('Check title of application', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/RollCall/);
});


test('View Dashboard Classes', async ({ page }) => {
  await page.goto('/app/dashboard/view');

  await expect(page.getByTestId('class-card-CS 192')).toBeVisible();
  await expect(page.getByText('CS 192')).toBeVisible();
  await expect(page.getByTestId('class-card-CS 145')).toBeVisible();
  await expect(page.getByText('CS 145')).toBeVisible();
});

test('Navigate to Scan tab', async ({ page }) => {
  await page.goto('/app/dashboard/view');

  const scanTabButton = await page.$('ion-tab-button[tab="tab2"]');
  await scanTabButton!.click();
  const currentUrl = page.url();
  expect(currentUrl).toContain('/app/dashboard/scan');
});

test('Navigate to Profile tab', async ({ page }) => {
  await page.goto('/app/dashboard/view');

  const scanTabButton = await page.$('ion-tab-button[tab="tab3"]');
  await scanTabButton!.click();
  const currentUrl = page.url();
  expect(currentUrl).toContain('/app/dashboard/profile');
});

