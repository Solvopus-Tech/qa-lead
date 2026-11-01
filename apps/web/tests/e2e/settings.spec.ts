import { test, expect } from '@playwright/test';

test('settings page loads', async ({ page }) => {
  await page.goto('/settings');
  await expect(page).toHaveTitle(/Settings/);
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
});

test('can update settings', async ({ page }) => {
  await page.goto('/settings');
  await page.getByLabel('Theme').selectOption('dark');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Settings saved')).toBeVisible();
});