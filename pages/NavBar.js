import { expect } from '@playwright/test';

export class NavBar {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.sidebar = page.locator('aside.oxd-sidepanel');

    }

    async logout() {
        await this.page.locator('.oxd-userdropdown-tab').click();
        await this.page.getByRole('menuitem', { name: /^Logout$/i }).click();
    }

    menuItem(name) {
        return this.page.getByRole('link', { name: new RegExp(`^\\s*${name}\\s*$`, 'i') });
    }

    async waitReady() {
        await this.page.waitForURL(/\/dashboard/i, { timeout: 15000 });
        await expect(this.sidebar).toBeVisible({ timeout: 10000 });
        await this.page
            .locator('.oxd-loading-spinner, .oxd-progress')
            .first()
            .waitFor({ state: 'detached', timeout: 5000 })
            .catch(() => {});
    }

    async open(name) {
        await this.waitReady();
        const link = this.menuItem(name);
        await link.waitFor({ state: 'visible', timeout: 10000 });
        await link.click();
        await this.page.waitForLoadState('load');

    }

    async openAdmin()  { await this.open('Admin');  await this.page.waitForURL(/admin\/viewSystemUsers/i); }
    async openPIM()    { await this.open('PIM');    await this.page.waitForURL(/pim/i); }
    async openLeave()  { await this.open('Leave');  await this.page.waitForURL(/leave/i); }

}
