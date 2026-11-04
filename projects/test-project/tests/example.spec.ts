import { it, expect } from 'vitest';

// Example end-to-end test
// Update baseURL in playwright.config.ts to match your application's URL

it('Homepage loads correctly', async () => {
  const response = await fetch('http://localhost:3000/contacts');
  expect(response.status).toBe(200);
  const json = await response?.json();
  expect(json).toBeInstanceOf(Array);
  expect(json.length).toBeGreaterThan(0);
});

it('Form submission works', async () => {
  const response = await fetch('http://localhost:3000/contacts', {
    data: {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Thank you for contacting us'
    }
  });
  expect(response.status).toBe(200);

});