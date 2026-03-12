// @ts-check
import { test, expect } from '@playwright/test';

test('Login, add iphone X to cart, checkout and confirm', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Fill in credentials
  await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
  await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');

  // Agree to terms and sign in
  await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).check();
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for shop page to load
  await page.waitForURL('**/angularpractice/shop');

  // Add iphone X to cart
  await page.locator('app-card').filter({ hasText: 'iphone X' }).getByRole('button').click();

  // Go to checkout
  await page.getByText('Checkout (').click();

  // Verify iphone X is in the cart
  await expect(page.locator('table').getByRole('link', { name: 'iphone X' })).toBeVisible();

  // Click Checkout button
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Fill delivery location and agree to terms
  await page.getByRole('textbox').fill('India');
  await page.locator('#checkbox2').check({ force: true });

  // Click Purchase
  await page.getByRole('button', { name: 'Purchase' }).click();

  // Confirm success - verify the order is placed
  await expect(page.getByText('Success')).toBeVisible();
});
