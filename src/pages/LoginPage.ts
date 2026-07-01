import { type Page, type Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly errorCloseButton: Locator;
  private readonly loginLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator("[data-test='error']");
    this.errorCloseButton = page.locator("button.error-button");
    this.loginLogo = page.locator(".login_logo");
  }

  async navigateToPage():Promise<void>{
    await this.page.goto('/')
  }

  async login(username:string, password:string):Promise<void>{
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async fillUsername(username:string):Promise<void>{
    await this.usernameInput.fill(username)
  }

  async fillPassword(password:string):Promise<void>{
    await this.passwordInput.fill(password)
  }

  async clickLoginButton():Promise<void>{
    await this.loginButton.click()
  }

  async getErrorMessageText():Promise<string>{
    return await this.errorMessage.textContent() || " "
  }

  async closeErrorMessage():Promise<void>{
    await this.errorCloseButton.click()
  }

  async clearFields():Promise<void>{
    await this.usernameInput.clear()
    await this.passwordInput.clear()
  }

  async expectPageLoaded():Promise<void>{
    await expect(this.loginLogo).toBeVisible()
    await expect(this.usernameInput).toBeVisible()
    await expect(this.passwordInput).toBeVisible()
    await expect(this.loginButton).toBeVisible()
  }

  async expectedErrorToBeVisible():Promise<void>{
    await expect(this.errorMessage).toBeVisible()
  }

  async expectErrorContains(text:string):Promise<void>{
    await expect(this.errorMessage).toBeVisible()
    await expect(this.errorMessage).toContainText(text)
  }

  async expectErrorNotVisible():Promise<void>{
    await expect(this.errorMessage).not.toBeVisible()
  }
  
  async expectUsernameEmpty():Promise<void> {
    await expect(this.usernameInput).toHaveValue('')
  }

  async expectPasswordEmpty():Promise<void>{
    await expect(this.passwordInput).toHaveValue('')
  }
}
