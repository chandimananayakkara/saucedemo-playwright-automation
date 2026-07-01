import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import users from '../../test-data/users.json';
import checkout from '../../test-data/checkout.json';
import products from '../../test-data/products.json';


test.describe('Complete Purchase Flow — E2E', () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

   
    await loginPage.navigateToPage();
    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );
    await inventoryPage.expectPageLoaded();
  });


  test('should complete purchase of single product @smoke @critical', async () => {
    
    
    const selectedProduct = products.products[0]; 
    await inventoryPage.addProductToCart(selectedProduct.name);
    await inventoryPage.expectCartCount(1);

    
    await inventoryPage.goToCart();
    await cartPage.expectPageLoaded();
    await cartPage.expectItemInCart(selectedProduct.name);
    await cartPage.expectItemPrice(selectedProduct.name, selectedProduct.price);
    await cartPage.expectItemCount(1);

  
    await cartPage.proceedToCheckout();
    await checkoutPage.expectStepOneLoaded();

  
    await checkoutPage.completeStepOne(checkout.validCustomer);
    await checkoutPage.expectStepTwoLoaded();

   
    await checkoutPage.expectProductInSummary(selectedProduct.name);

   
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });

  test('should complete purchase of multiple products @regression @critical', async () => {

    const product1 = products.products[0]; 
    const product2 = products.products[1]; 
    const product3 = products.products[4]; 
    await inventoryPage.addProductToCart(product1.name);
    await inventoryPage.addProductToCart(product2.name);
    await inventoryPage.addProductToCart(product3.name);
    await inventoryPage.expectCartCount(3);

   
    await inventoryPage.goToCart();
    await cartPage.expectItemCount(3);
    await cartPage.expectItemInCart(product1.name);
    await cartPage.expectItemInCart(product2.name);
    await cartPage.expectItemInCart(product3.name);

  
    await cartPage.proceedToCheckout();
    await checkoutPage.completeStepOne(checkout.validCustomer);
    await checkoutPage.expectStepTwoLoaded();
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });

  test('should return to products after completed order @regression', async () => {
  
    await inventoryPage.addProductToCart(products.products[0].name);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeStepOne(checkout.validCustomer);
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();

    await checkoutPage.backToHome();
    await inventoryPage.expectPageLoaded();
    await inventoryPage.expectCartEmpty();

  });
});