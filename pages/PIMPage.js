import { expect } from '@playwright/test';


export class PIMPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {

        this.page = page;
        this.listUrl            = /\/pim\/viewEmployeeList/i;
        this.addUrl             = /\/pim\/addEmployee/i;
        this.headingEmployee    = page.getByRole('heading', { name: /employee information/i });
        this.headerContainer    = page.locator('.orangehrm-header-container');

        this.addBtn = page.getByRole('button', { name: /^Add$/ });
        this.addButtonCss = this.headerContainer.locator('button:has-text("Add")');
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

    async waitNoLoader() {
        await this.page
            .locator('.oxd-loading-spinner, .oxd-progress, .oxd-sheet__loader')
            .first()
            .waitFor({ state: 'detached', timeout: 10000 })
            .catch(() => {});
        await this.page.waitForLoadState('networkidle');
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

        await this.page.waitForURL(this.listUrl, { timeout: 15000 }).catch(() => {});
        await expect(this.headingEmployee).toBeVisible({ timeout: 15000 }).catch(() => {});
        await this.waitNoLoader();

    }

    async searchByFullName(full, hintStartsWith) {
        await this.empNameFilter.fill(full);
        await this.autoDrop.getByText(hintStartsWith, { exact: false }).first().click();
        await this.searchBtn.click();
    }

    async openAdd() {
        await this.openList();

        const btn = (await this.addBtn.isVisible().catch(() => false))
            ? this.addBtn
            : this.addButtonCss.first();

        await btn.scrollIntoViewIfNeeded();
        await expect(btn).toBeVisible({ timeout: 10000 });
        await expect(btn).toBeEnabled({ timeout: 10000 });

        await btn.click();
        await this.page.waitForURL(this.addUrl, { timeout: 15000 });
    }

    async save() {
        await this.page.getByRole('button', { name: /^Save$/ }).click();
    }

    errorFor(field) {
        const input = this.fieldByKey(field);
        const group = input.locator(
            'xpath=ancestor::div[contains(@class,"oxd-input-group")][1]'
        );
        return group.locator('.oxd-input-field-error-message').first();
    };

    fieldByKey(key) {
        switch (key) {
            case 'firstName':  return this.page.getByPlaceholder('First Name');
            case 'middleName': return this.page.getByPlaceholder('Middle Name');
            case 'lastName':   return this.page.getByPlaceholder('Last Name');
            default: throw new Error(`Unknown field key: ${key}`);
        }

    }


}