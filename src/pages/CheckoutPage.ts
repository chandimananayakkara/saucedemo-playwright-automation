import {type Page, type Locator, expect} from '@playwright/test'

export class CheckoutPage{
  private readonly page:Page
  private readonly pageTitle:Locator
  private readonly firstNameInput:Locator
  private readonly lastNameInput:Locator
  private readonly postalCodeInput:Locator
  private readonly continueButton:Locator
  private readonly cancelButton:Locator
  private readonly errorMessage:Locator
  private readonly summarySubtotal:Locator
  private readonly summaryTax:Locator
  private readonly summaryTotal:Locator
  private readonly finishButton:Locator
  private readonly completeHeader:Locator
  private readonly completeText:Locator
  private readonly backHomeButton:Locator

  constructor(page:Page){
    this.page = page
    this.pageTitle = page.locator("[data-test='title']")
    this.firstNameInput = page.locator("[data-test='firstName']")
    this.lastNameInput = page.locator("[data-test='lastName']")
    this.postalCodeInput = page.locator("[data-test='postalCode']")
    this.continueButton = page.locator("[data-test='continue']")
    this.cancelButton = page.locator("[data-test='cancel']")
    this.errorMessage = page.locator(".error-message-container.error")
    this.summarySubtotal = page.locator("[data-test='subtotal-label']")
    this.summaryTax = page.locator("[data-test='tax-label']")
    this.summaryTotal = page.locator("[data-test='total-label']")
    this.finishButton = page.locator("[data-test='finish']")
    this.completeHeader = page.locator("[data-test='complete-header']")
    this.completeText = page.locator("[data-test='complete-header']")
    this.backHomeButton = page.locator("[data-test='back-to-products']")
  }

  async fillCheckoutInfo(info:{
    firstName:string,
    lastName:string,
    zip:string
  }):Promise<void>{
    await this.firstNameInput.fill(info.firstName)
    await this.lastNameInput.fill(info.lastName)
    await this.postalCodeInput.fill(info.zip)
  }

  async continueToStepTwo(): Promise<void>{
    await this.continueButton.click()
  }

  async completeStepOne(info:{
    firstName:string, lastName:string, zip:string
  }):Promise<void>{
    await this.fillCheckoutInfo(info)
    await this.continueToStepTwo()
  }

  async cancelCheckout():Promise<void>{
    await this.cancelButton.click()
  }

  async finishOrder():Promise<void>{
    await this.finishButton.click()
  }

  async getSummeryTotal():Promise<string>{
    return await this.summaryTotal.textContent() || ''
  }

  async backToHome():Promise<void>{
    await this.backHomeButton.click()
  }

  async expectStepOneLoaded():Promise<void>{
    await expect(this.pageTitle).toHaveText('Checkout: Your Information')
    await expect(this.firstNameInput).toBeVisible()
    await expect(this.lastNameInput).toBeVisible()
    await expect(this.postalCodeInput).toBeVisible()
  }

  async expectStepTwoLoaded(): Promise<void>{
    await expect(this.pageTitle).toHaveText('Checkout: Overview')
    await expect(this.summaryTotal).toBeVisible()
    await expect(this.finishButton).toBeVisible()
  }

  async expectOrderComplete():Promise<void>{
    await expect(this.completeHeader).toHaveText('Thank you for your order!')
    await expect(this.completeText).toBeVisible()
    await expect(this.backHomeButton).toBeVisible()
  }

  async expectErrorContains(text:string):Promise<void>{
    await expect(this.errorMessage).toBeVisible()
    await expect(this.errorMessage).toContainText(text)
  }

  async expectProductInSummary(productName: string):Promise<void>{
     await expect(
      this.page
        .locator("[data-test='inventory-item-name']")
        .filter({ hasText: productName }),
    ).toBeVisible();
  }

  async expectTotalContains(amount:string):Promise<void>{
    await expect(this.summaryTotal).toContainText(amount)
  }
}