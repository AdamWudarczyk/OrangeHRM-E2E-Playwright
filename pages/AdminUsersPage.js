export class AdminUsersPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.usernameFilter = page.getByPlaceholder('Type for hints...').first();
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.rows = page.locator('div.oxd-table-body > div.oxd-table-card');
    }
    async search(username) {
        await this.usernameFilter.fill(username);
        await this.searchBtn.click();
    }
}
