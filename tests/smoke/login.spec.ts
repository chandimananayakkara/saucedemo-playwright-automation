import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/LoginPage";
import users from "../../test-data/users.json";

test.describe("Login Page Tests", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.navigateToPage()
  });

  test("Should display login page correctly", async ({ page }) => {
    await loginPage.expectPageLoaded()
  });

  test("Should login successfully with valid credentials", async ({ page }) => {
    await loginPage.login(users.validUser.username, users.validUser.password)
    await expect(page.getByText("Products")).toBeVisible();
    await expect(page).toHaveURL(/inventory/)
  });

  test("Should show error for locked out user", async ({ page }) => {
    await loginPage.login(users.lockedUser.username, users.lockedUser.password)
    await loginPage.expectErrorContains('locked out')
  });

  test("Should show error for invalid credentials", async ({ page }) => {
   await loginPage.login(users.invalidUser.username, users.invalidUser.password)
   await loginPage.expectErrorContains('do not match')
  });

  test("Should show error when username is empty", async ({ page }) => {
    await loginPage.fillPassword(users.validUser.password)
    await loginPage.clickLoginButton()
    
    await loginPage.expectErrorContains('Username is required')
  });

  test("Should show error when password is empty", async ({ page }) => {
    await loginPage.fillUsername(users.validUser.username)
    await loginPage.clickLoginButton()

    await loginPage.expectErrorContains('Password is required')
  });

  test("Should show error when both fields are empty", async ({ page }) => {
   await loginPage.clickLoginButton()
   await loginPage.expectErrorContains('Username is required')
  });

  test('Should close error message when X is clicked', async ({page})=>{
    await loginPage.clickLoginButton()
    await loginPage.expectedErrorToBeVisible()
    await loginPage.closeErrorMessage()
    await loginPage.expectErrorNotVisible()
  })

  test('Should clear fields and retry login', async({page})=>{
    await loginPage.login(users.invalidUser.username, users.invalidUser.password)
    await loginPage.expectedErrorToBeVisible()

    await loginPage.clearFields()
    await loginPage.expectUsernameEmpty()
    await loginPage.expectPasswordEmpty()

    await loginPage.login(users.validUser.username, users.validUser.password)

    await expect(loginPage['page']).toHaveURL(/inventory/)
  })
});
