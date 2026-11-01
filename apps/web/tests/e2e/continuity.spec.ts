import { test, expect } from '@playwright/test';

test('continuous session works', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard/);

  await page.goto('/settings');
  await expect(page).toHaveURL(/settings/);

  await page.goto('/portal');
  await expect(page).toHaveURL(/portal/);
});