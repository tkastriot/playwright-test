import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Full Cart and Checkout Flow', () => {
  test('User can login, add to cart, and complete checkout', async ({ page }) => {
    // Step 1: Go to login page
    await page.goto('https://www.saucedemo.com/');

    // Step 2: Login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products')).toBeVisible();

    // Step 3: Add first product to cart
    const firstAddButton = page.locator('.inventory_item').first().getByRole('button');
    await firstAddButton.click();

    // Step 4: Navigate to cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('.cart_item')).toHaveCount(1);

    // Step 5: Proceed to checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Step 6: Fill in checkout info
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();

    // Step 7: Finalize checkout
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();

    // Step 8: Verify order confirmation
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });
});
