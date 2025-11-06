import { test, expect } from '@playwright/test';
import creds from '../fixtures/credentials.json' with { type: 'json' };

import { LoginPage } from '../pages/LoginPage.js';
import { NavBar } from '../pages/NavBar.js';
import { AdminUsersPage } from '../pages/AdminUsersPage.js';

test('Positive: filter users by role ESS', async ({ page }) => {
    const login = new LoginPage(page);
    const nav   = new NavBar(page);
    const admin = new AdminUsersPage(page);

    await login.goto();
    await login.login(creds.username, creds.password);

    await nav.openAdmin();
    await admin.open();
    await admin.filterByRole('ESS');
    await admin.search();

    const rowCount = await admin.rows.count();
    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
        await expect(admin.rows.nth(i)).toContainText('ESS');
    }
});
