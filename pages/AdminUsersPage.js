export class AdminUsersPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: /system users/i });
        this.usernameFilter = page.getByPlaceholder('Type for hints...').first();
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this._rows = page.locator('.oxd-table-body .oxd-table-card');
        this.tableRows = page.locator('div.oxd-table-body > div.oxd-table-card');
        this.userRoleCombo = page.getByRole('combobox', { name: /user role/i }).first();
        this.userRoleComboFallback = page
            .locator('label', { hasText: 'User Role' })
            .locator("xpath=../following-sibling::div//div[contains(@class,'oxd-select-text')]");
    }


    async open() {
        await this.page.waitForURL(/admin\/viewSystemUsers/i, { timeout: 15000 });
    }

    get rows() {
        return this._rows;
    }

    async search(username = '') {
        await this.usernameFilter.fill(username);
        await this.searchBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openUser(username) {
        await this.search(username);
        await this.tableRows.first().click();
    }

    async resetPassword(newPass) {

        const passwords = this.page.locator('input[type="password"]');
        if (await passwords.count() < 2) {
            await this.page.getByRole('button', { name: /reset|change password/i }).first().click();
        }

        await passwords.first().waitFor({ state: 'visible', timeout: 10000 });

        const enabled = this.page.locator('input[type="password"]:not([disabled])');
        await enabled.first().waitFor({ state: 'visible', timeout: 10000 });

        await enabled.nth(0).fill(newPass);
        await enabled.nth(1).fill(newPass);
        await this.page.getByRole('button', { name: /^Save$/ }).click();
    }



    async filterByRole(roleText) {

        if (await this.userRoleCombo.isVisible().catch(() => false)) {
            await this.userRoleCombo.click();
        } else {
            await this.userRoleComboFallback.first().click();
        }
        await this.page.getByRole('option', { name: new RegExp(`^\\s*${roleText}\\s*$`, 'i') }).click();
    }

}
