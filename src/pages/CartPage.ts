import { type Page, type Locator, expect } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator("[data-test='title']");
    this.cartItems = page.locator("[data-test='inventory-item']");
    this.continueShoppingButton = page.locator(
      "[data-test='continue-shopping']",
    );
    this.checkoutButton = page.locator("[data-test='checkout']");
  }

  async removeItem(productName: string): Promise<void> {
    const dataTestValue = productName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/\(/g, "")
      .replace(/\)/g, "");

    await this.page.locator(`[data-test="remove-${dataTestValue}"]`).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.page
      .locator("[data-test='inventory-item-name']")
      .allTextContents();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toHaveText("Your Cart");
  }

  async expectItemInCart(productName: string): Promise<void> {
    await expect(
      this.page
        .locator("[data-test='inventory-item-name']")
        .filter({ hasText: productName }),
    ).toBeVisible();
  }

  async expectItemNotInCart(productName: string): Promise<void> {
    await expect(
      this.page
        .locator("[data-test='inventory-item-name']")
        .filter({ hasText: productName }),
    ).not.toBeVisible();
  }

  async expectItemCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }

  async expectItemPrice(
    productName: string,
    expectedPrice: string,
  ): Promise<void> {
    const itemCard = this.cartItems.filter({ hasText: productName });
    await expect(
      itemCard.locator("[data-test='inventory-item-price']"),
    ).toHaveText(expectedPrice);
  }
}
