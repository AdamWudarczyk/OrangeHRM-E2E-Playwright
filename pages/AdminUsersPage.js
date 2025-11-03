export class AdminUsersPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.usernameFilter = page.getByPlaceholder('Type for hints...').first();
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.rows = page.locator('div.oxd-table-body > div.oxd-table-card');
        this.tableRows = page.locator('div.oxd-table-body > div.oxd-table-card');
        this.userRoleSelect = page.getByText('User Role').locator('xpath=..').locator('i');
    }

    async open() {
        await this.page.waitForURL(/admin\/viewSystemUsers/i, { timeout: 15000 });
    }

    async rows() {
        return this.tableRows;
    }

    async search(username) {
        await this.usernameFilter.fill(username);
        await this.searchBtn.click();
        await this.page.getByRole('button', { name: /^Search$/ }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async openUser(username) {
        await this.search(username);
        await this.tableRows.first().click();
    }

    async resetPassword(newPass) {

        const passwords = this.page.locator('input[type="password"]');
        if (await passwords.count() < 2) {

            const btn = this.page.getByRole('button', { name: /reset|change password/i });
            if (await btn.isVisible()) await btn.click();
        }
        await passwords.nth(0).fill(newPass);
        await passwords.nth(1).fill(newPass);
        await this.page.getByRole('button', { name: /^Save$/ }).click();
    }

    async filterByRole(roleText) {

        await this.page.getByText('User Role').locator('xpath=..').getByRole('textbox').click({ force: true }).catch(() => {});
        await this.page.getByRole('option', { name: new RegExp(roleText, 'i') }).click();
    }

}
