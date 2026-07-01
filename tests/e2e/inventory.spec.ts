
import { test, expect } from '../../src/fixtures/test-fixtures';
import products from '../../test-data/products.json';

test.describe('Inventory Page Tests', () => {

  test('should display all 6 products @smoke', async ({
    loggedInPage,
    inventoryPage,
  }) => {
   
    await inventoryPage.expectProductCount(products.totalProductCount);
  });

  test('should display correct product names @regression', async ({
    loggedInPage,
    inventoryPage,
  }) => {
    for (const product of products.products) {
      await inventoryPage.expectProductVisible(product.name);
    }
  });

  test('should display correct prices @regression', async ({
    loggedInPage,
    inventoryPage,
  }) => {
    for (const product of products.products) {
      const actualPrice = await inventoryPage.getProductPrice(product.name);
      expect(actualPrice).toBe(product.price);
    }
  });

  test('should sort products A to Z @regression', async ({
    loggedInPage,
    inventoryPage,
  }) => {
    await inventoryPage.sortProducts('az');
    await inventoryPage.expectProductsSortedAZ();
  });

  test('should sort products Z to A @regression', async ({
    loggedInPage,
    inventoryPage,
  }) => {
    await inventoryPage.sortProducts('za');
    await inventoryPage.expectProductsSortedZA();
  });

  test('should sort products price low to high @regression', async ({
    loggedInPage,
    inventoryPage,
  }) => {
    await inventoryPage.sortProducts('lohi');
    await inventoryPage.expectProductsSortedPriceLowToHigh();
  });

  test('should sort products price high to low @regression', async ({
    loggedInPage,
    inventoryPage,
  }) => {
    await inventoryPage.sortProducts('hilo');
    await inventoryPage.expectProductsSortedPriceHighToLow();
  });

  test('should add single product to cart @smoke @critical', async ({
    loggedInPage,
    inventoryPage,
  }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);
  });

  test('should add multiple products to cart @regression', async ({
    loggedInPage,
    inventoryPage,
  }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.expectCartCount(3);
  });

  test('should remove product from cart on inventory page @regression', async ({
    loggedInPage,
    inventoryPage,
  }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);
    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    await inventoryPage.expectCartEmpty();
  });

  test('should add all products and verify cart count @regression', async ({
    loggedInPage,
    inventoryPage,
  }) => {
    for (const product of products.products) {
      await inventoryPage.addProductToCart(product.name);
    }
    await inventoryPage.expectCartCount(products.totalProductCount);
  });

  test('should remove item from cart page @regression', async ({
    loggedInPage,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();

    await cartPage.expectItemCount(2);
    await cartPage.removeItem('Sauce Labs Backpack');
    await cartPage.expectItemCount(1);
    await cartPage.expectItemNotInCart('Sauce Labs Backpack');
    await cartPage.expectItemInCart('Sauce Labs Bike Light');
  });

  test('should continue shopping from cart @regression', async ({
    loggedInPage,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await inventoryPage.expectPageLoaded();
    await inventoryPage.expectCartCount(1);
  });

  test('should logout successfully @smoke', async ({
    loggedInPage,
    inventoryPage,
    page,
  }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});