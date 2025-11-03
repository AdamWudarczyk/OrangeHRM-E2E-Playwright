export class PIMPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
        this.addBtn = page.getByRole('button', { name: /^Add$/ });
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName  = page.getByPlaceholder('Last Name');
        this.toggleLogin = page.getByText('Create Login Details', { exact: true });
        this.inputs = page.locator('form input.oxd-input');
        this.passwords = page.locator('input[type="password"]');
        this.saveBtn = page.getByRole('button', { name: /^Save$/ });
        this.toast = page.locator('.oxd-toast');

        this.empNameFilter = page.getByPlaceholder('Type for hints...').first();
        this.autoDrop = page.locator('.oxd-autocomplete-dropdown');
        this.searchBtn = page.getByRole('button', { name: /^Search$/ });
        this.rows = page.locator('div.oxd-table-body > div.oxd-table-card');
    }

    async addEmployeeWithLogin({ first, last, username, password }) {
        await this.addBtn.click();
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.toggleLogin.click();
        await this.inputs.nth(5).fill(username);
        await this.passwords.nth(0).fill(password);
        await this.passwords.nth(1).fill(password);
        await Promise.all([
            this.page.waitForResponse(r => r.url().includes('/api/v2/pim/employees') && r.status() < 400),
            this.saveBtn.click(),
        ]);
    }

    async openList() {

        await this.page.getByRole('link', { name: /Employee List/i }).click().catch(() => {});
    }

    async searchByFullName(full, hintStartsWith) {
        await this.empNameFilter.fill(full);
        await this.autoDrop.getByText(hintStartsWith, { exact: false }).first().click();
        await this.searchBtn.click();
    }

    async openAdd() {
        await this.page.getByRole('button', { name: /^Add$/ }).click();
        await this.page.waitForURL(/pim\/addEmployee/i);
    }

    async save() {
        await this.page.getByRole('button', { name: /^Save$/ }).click();
    }

    errorFor(field) {
        const map = {
            firstName: this.page.getByPlaceholder('First Name').locator('xpath=../../..').locator('.oxd-input-group__message'),
            lastName:  this.page.getByPlaceholder('Last Name').locator('xpath=../../..').locator('.oxd-input-group__message'),
        };
        return map[field];
    }

}