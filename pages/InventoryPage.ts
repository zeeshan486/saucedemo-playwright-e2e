import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButtons: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator('.btn_inventory');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addFirstNItems(n: number) {
    for (let i = 0; i < n; i++) {
      await this.addToCartButtons.nth(i).click();
    }
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}
