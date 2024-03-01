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

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8100/');
  await expect(page).toHaveTitle(/RollCall/);
});


test('LOG IN', async ({ page }) => {
  await page.goto('http://localhost:8100/');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('DASHBOARD CLASSES', async ({ page }) => {
  await page.goto('http://localhost:8100/app/dashboard/view');
  await expect(page).toHaveTitle(/CS 192/);
});

test('SCAN QR WORKS', async ({ page }) => {
  await page.goto('http://localhost:8100/app/dashboard/view');
  await page.getByRole('link', { name: 'Scan' }).click();
  await expect(page.getByRole('heading', { name: 'Scan QR Code' })).toBeVisible();
});

test('PROFILE', async ({ page }) => {
  await page.goto('http://localhost:8100/app/dashboard/view');
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
});