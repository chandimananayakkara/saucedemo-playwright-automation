import { type Page, type Locator, expect } from "@playwright/test";

export class InventoryPage {
  private readonly page: Page;
  private readonly pageTitle: Locator;
  private readonly sortDropdown: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;
  private readonly inventoryItems: Locator;
  private readonly burgerMenuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.burgerMenuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async addProductToCart(productName: string): Promise<void> {
    const dataTestValue = productName.toLowerCase().replace(/ /g, "-");

    await this.page
      .locator(`[data-test="add-to-cart-${dataTestValue}"]`)
      .click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const dataTestValue = productName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/\(/g, "")
      .replace(/\)/g, "");

    await this.page.locator(`[data-test="remove-${dataTestValue}"]`).click();
  }

  async sortProducts(sortOption: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.page
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();

    return priceTexts.map((price) => parseFloat(price.replace("$", "")));
  }

  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async getProductPrice(productName: string): Promise<string> {
    const productCard = this.inventoryItems.filter({
      hasText: productName,
    });

    return (
      (await productCard
        .locator('[data-test="inventory-item-price"]')
        .textContent()) || ""
    );
  }

  async openProductDetail(productName: string): Promise<void> {
    await this.page
      .locator('[data-test="inventory-item-name"]')
      .filter({ hasText: productName })
      .click();
  }

  async logout(): Promise<void> {
    await this.burgerMenuButton.click();
    await this.logoutLink.click();
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toHaveText("Products");
    await expect(this.sortDropdown).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async expectCartCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }

  async expectProductsSortedAZ(): Promise<void> {
    const names = await this.getAllProductNames();
    const sorted = [...names].sort();

    expect(names).toEqual(sorted);
  }

  async expectProductsSortedZA(): Promise<void> {
    const names = await this.getAllProductNames();
    const sorted = [...names].sort().reverse();

    expect(names).toEqual(sorted);
  }

  async expectProductsSortedPriceLowToHigh(): Promise<void> {
    const prices = await this.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  }

  async expectProductsSortedPriceHighToLow(): Promise<void> {
    const prices = await this.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(
      this.page
        .locator('[data-test="inventory-item-name"]')
        .filter({ hasText: productName }),
    ).toBeVisible();
  }

  async expectProductCount(expectedCount: number): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }
}
