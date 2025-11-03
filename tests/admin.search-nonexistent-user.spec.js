import { test, expect } from '@playwright/test';
import creds from '../fixtures/credentials.json' with { type: 'json' };

import { LoginPage } from '../pages/LoginPage.js';
import { NavBar } from '../pages/NavBar.js';
import { AdminUsersPage } from '../pages/AdminUsersPage.js';

test('Negative: Searching for a non-existent user shows empty results', async ({ page }) => {
    const login = new LoginPage(page);
    const nav   = new NavBar(page);
    const admin = new AdminUsersPage(page);

    await login.goto();
    await login.login(creds.username, creds.password);
    await expect(page).toHaveURL(/dashboard/);

    await nav.openAdmin();

    const fakeUser = `user_${Date.now()}`;
    await admin.search(fakeUser);

    const results = admin.rows;
    await expect(results).toHaveCount(0);

    const noRecordsMsg = page.locator('.oxd-table-body').getByText(/no records found/i);
    await expect(noRecordsMsg).toBeVisible();
});
