import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
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
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  // fill the form data
  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a test description for the Test Hotel.");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Spa").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  // click the save button
  await page.getByRole("button", { name: "Save" }).click();

  // make sure the user has successfully created a hotel
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});
