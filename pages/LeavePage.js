export class LeavePage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }
    async openApply() {

        await this.page.getByRole('link', { name: /^Apply$/ }).click();
        await this.page.getByText('Apply Leave', { exact: false }).waitFor();
    }
    async applyFirstAvailableTypeForToday() {

        const type = this.page.locator('.oxd-select-text');
        await type.first().click();
        await this.page.locator('.oxd-select-dropdown > *').first().click();


        await this.page.getByRole('button', { name: /^Apply$/ }).click();
        await this.page.locator('.oxd-toast').waitFor();
    }
    async openMyLeave() {
        await this.page.getByRole('link', { name: /My Leave/i }).click();
        await this.page.getByText('My Leave', { exact: false }).waitFor();
    }
    async hasAtLeastOneRow() {
        const rows = this.page.locator('div.oxd-table-body > div.oxd-table-card');
        await rows.first().waitFor({ timeout: 10000 });
        return await rows.count() > 0;
    }
}
