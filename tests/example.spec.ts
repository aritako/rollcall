import { test, expect } from '@playwright/test';

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
  await expect(page.getByTestId('class-card-CS 153')).toBeVisible();
  await expect(page.getByText('CS 153')).toBeVisible();
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

