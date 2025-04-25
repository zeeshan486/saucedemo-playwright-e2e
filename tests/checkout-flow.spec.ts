import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Complete checkout flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.pause();
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addFirstNItems(2);
  await inventoryPage.goToCart();

  await cartPage.proceedToCheckout();
  await checkoutPage.enterUserInfo('John', 'Doe', '12345');
  await checkoutPage.finishCheckout();

  const confirmation = await checkoutPage.getConfirmationText();
  expect(confirmation).toContain('Thank you for your order!');
});
