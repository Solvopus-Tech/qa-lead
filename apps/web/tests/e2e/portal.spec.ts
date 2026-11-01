import { test, expect } from '@playwright/test';

test('portal page loads', async ({ page }) => {
  await page.goto('/portal');
  await expect(page).toHaveTitle(/Portal/);
  await expect(page.getByRole('heading', { name: 'Portal' })).toBeVisible();
});

test('portal has list of items', async ({ page }) => {
  await page.goto('/portal');
  await expect(page.getByRole('list')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(3);
});