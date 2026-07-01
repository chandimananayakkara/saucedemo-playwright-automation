import { test, expect } from "@playwright/test";
import users from "../../test-data/users.json";

test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Should display login page correctly", async ({ page }) => {
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page.locator("#user-name")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#login-button")).toBeVisible();
  });

  test("Should login successfully with valid credentials", async ({ page }) => {
    await page.locator("#user-name").fill(users.validUser.username);
    await page.locator("#password").fill(users.validUser.password);
    await page.locator("#login-button").click();

    await expect(page.getByText("Products")).toBeVisible();
  });

  test("Should show error for locked out user", async ({ page }) => {
    await page.locator("#user-name").fill(users.lockedUser.username);
    await page.locator("#password").fill(users.lockedUser.password);
    await page.locator("#login-button").click();

    const errorMessage = page.locator("[data-test='error']");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("locked out");
  });

  test("Should show error for invalid credentials", async ({ page }) => {
    await page.locator("#user-name").fill(users.invalidUser.username);
    await page.locator("#password").fill(users.invalidUser.username);
    await page.locator("#login-button").click();

    const errorMessage = page.locator("[data-test='error']");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("do not match");
  });

  test("Should show error when username is empty", async ({ page }) => {
    await page.locator("#password").fill(users.validUser.password);
    await page.locator("#login-button").click();

    const errorMessage = page.locator("[data-test='error']");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Username is required");
  });

  test("Should show error when password is empty", async ({ page }) => {
    await page.locator("#user-name").fill(users.validUser.username);
    await page.locator("#login-button").click();

    const errorMessage = page.locator("[data-test='error']");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Password is required");
  });

  test("Should show error when both fields are empty", async ({ page }) => {
    await page.locator("#login-button").click();

    const errorMessage = page.locator("[data-test='error']");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Username is required");
  });
});
