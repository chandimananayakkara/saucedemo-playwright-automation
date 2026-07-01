import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Visual Regression Tests @visual', () => {

  test('login page visual check', async ({ loginPage, page }) => {
    await loginPage.navigateToPage();

    await expect(page).toHaveScreenshot('login-page.png', {
    
      maxDiffPixelRatio: 0.05,
      fullPage: true,
    });
  });

  test('inventory page visual check', async ({
    loggedInPage,
    page,
  }) => {
    await expect(page).toHaveScreenshot('inventory-page.png', {
      maxDiffPixelRatio: 0.05,
      fullPage: true,
    });
  });

  test('cart page visual check', async ({
    loggedInPage,
    inventoryPage,
    page,
  }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    await expect(page).toHaveScreenshot('cart-with-item.png', {
      maxDiffPixelRatio: 0.05,
    });
  });

  test('empty cart visual check', async ({
    loggedInPage,
    inventoryPage,
    page,
  }) => {
    await inventoryPage.goToCart();

    await expect(page).toHaveScreenshot('cart-empty.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});