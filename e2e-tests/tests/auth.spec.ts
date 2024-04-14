import { test, expect, Page } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // click the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  // make sure it redirects to the sign in page
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // fill out email and password field
  await page.locator("[name=email]").fill("test@email.com");
  await page.locator("[name=password]").fill("password");

  // click the login button
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await assertUserHasSuccessfullySignedIn(page);
});

test("should allow user to register through sign in button and register link", async ({
  page,
}) => {
  await page.goto(UI_URL);

  // click the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  // click the register link
  await page.getByRole("link", { name: "Create an account here." }).click();

  await testRegistrationIsSuccessfull(page);
});

test("should allow user to register through register button", async ({
  page,
}) => {
  await page.goto(UI_URL);

  // click the sign in button
  await page.getByRole("link", { name: "Register" }).click();

  await testRegistrationIsSuccessfull(page);
});

const testRegistrationIsSuccessfull = async (page: Page) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@email.com`;
  // make sure it redirects to the register page
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  // fill out the fields in the form
  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password");
  await page.locator("[name=confirmPassword]").fill("password");

  // click the create account button
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration successful!")).toBeVisible();
  await assertUserHasSuccessfullySignedIn(page);
};

const assertUserHasSuccessfullySignedIn = async (page: Page) => {
  // make sure the user has successfully logged in
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
};
