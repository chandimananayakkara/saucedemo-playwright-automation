import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

test.describe('Inventory Page Tests', () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.navigateToPage();
    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );
  });

  test('should display all 6 products', async () => {
    await inventoryPage.expectProductCount(products.totalProductCount);
  });

  test('should display correct product names', async () => {
    for (const product of products.products) {
      await inventoryPage.expectProductVisible(product.name);
    }
   
  });

  test('should display correct prices', async () => {
    for (const product of products.products) {
      const actualPrice = await inventoryPage.getProductPrice(product.name);
      expect(actualPrice).toBe(product.price);
    }
  });

 
  test('should sort products A to Z', async () => {
    await inventoryPage.sortProducts('az');
    await inventoryPage.expectProductsSortedAZ();
  });

  test('should sort products Z to A', async () => {
    await inventoryPage.sortProducts('za');
    await inventoryPage.expectProductsSortedZA();
  });

  test('should sort products price low to high', async () => {
    await inventoryPage.sortProducts('lohi');
    await inventoryPage.expectProductsSortedPriceLowToHigh();
  });

  test('should sort products price high to low', async () => {
    await inventoryPage.sortProducts('hilo');
    await inventoryPage.expectProductsSortedPriceHighToLow();
  });

  test('should add single product to cart', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);
  });

  test('should add multiple products to cart', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.expectCartCount(3);
  });

  test('should remove product from cart on inventory page', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);

    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    await inventoryPage.expectCartEmpty();
  });

  test('should add all products and verify cart count', async () => {
    for (const product of products.products) {
      await inventoryPage.addProductToCart(product.name);
    }
    await inventoryPage.expectCartCount(products.totalProductCount);
  });

 
  test('should remove item from cart page', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.goToCart();

    await cartPage.expectItemCount(2);
    await cartPage.removeItem('Sauce Labs Backpack');
    await cartPage.expectItemCount(1);
    await cartPage.expectItemNotInCart('Sauce Labs Backpack');
    await cartPage.expectItemInCart('Sauce Labs Bike Light');
  });

  test('should continue shopping from cart', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.goToCart();

    await cartPage.continueShopping();
    await inventoryPage.expectPageLoaded();
    await inventoryPage.expectCartCount(1);
   
  });

 
  test('should logout successfully', async ({ page }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
   
  });
});