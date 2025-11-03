export class NavBar {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }
    async openPIM() {
        await this.page.getByRole('menuitem', { name: 'PIM' }).click();
    }
    async openAdmin() {
        await this.page.getByRole('menuitem', { name: 'Admin' }).click();
        await this.page.waitForURL(/admin\/viewSystemUsers/);
    }
    async openLeave() {
        await this.page.getByRole('menuitem', { name: 'Leave' }).click();
    }
    async logout() {
        await this.page.locator('.oxd-userdropdown-tab').click();
        await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    }
}
