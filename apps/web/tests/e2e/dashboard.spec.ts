import { test, expect } from '@playwright/test';

test('dashboard page loads', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveTitle(/Dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('dashboard shows stats', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Total Users')).toBeVisible();
  await expect(page.getByText('Active Sessions')).toBeVisible();
});