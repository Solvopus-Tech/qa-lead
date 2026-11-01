import { test, expect } from '@playwright/test';

test('login page has expected elements', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveTitle(/Login/);
  await expect(page.getByLabel('Username')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

test('login with valid credentials', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Username').fill('testuser');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard/);
});