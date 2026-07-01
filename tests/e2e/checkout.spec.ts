import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import users from '../../test-data/users.json';
import checkout from '../../test-data/checkout.json';

test.describe('Checkout Validation Tests', () => {

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
    await loginPage.login(users.validUser.username, users.validUser.password);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectStepOneLoaded();
  });

  test('should show error when first name is empty @regression', async () => {
    await checkoutPage.completeStepOne(checkout.emptyFirstName);
    await checkoutPage.expectErrorContains('First Name is required');
  });

  test('should show error when last name is empty @regression', async () => {
    await checkoutPage.completeStepOne(checkout.emptyLastName);
    await checkoutPage.expectErrorContains('Last Name is required');
  });

  test('should show error when postal code is empty @regression', async () => {
    await checkoutPage.completeStepOne(checkout.emptyZip);
    await checkoutPage.expectErrorContains('Postal Code is required');
  });

  test('should show error when all fields are empty @regression', async () => {
    await checkoutPage.continueToStepTwo();
    await checkoutPage.expectErrorContains('First Name is required');
  });

  test('should proceed to step two with valid info @smoke @critical', async () => {
    await checkoutPage.completeStepOne(checkout.validCustomer);
    await checkoutPage.expectStepTwoLoaded();
    await checkoutPage.expectProductInSummary('Sauce Labs Backpack');
  });

  test('should cancel checkout and return to cart @regression', async () => {
    await checkoutPage.cancelCheckout();
    await cartPage.expectPageLoaded();
    await cartPage.expectItemInCart('Sauce Labs Backpack');

  });

  test('should display correct total in summary @regression @critical', async () => {
    await checkoutPage.completeStepOne(checkout.validCustomer);
    await checkoutPage.expectStepTwoLoaded();

    const total = await checkoutPage.getSummeryTotal();
    expect(total).toBeTruthy();
 
  });
});