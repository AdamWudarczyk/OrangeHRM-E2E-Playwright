import { test, expect } from '@playwright/test';
import creds from '../fixtures/credentials.json' with { type: 'json' };

import { LoginPage } from '../pages/LoginPage.js';
import { NavBar } from '../pages/NavBar.js';
import { AdminUsersPage } from '../pages/AdminUsersPage.js';

test('E2E: reset password -> login with new password', async ({ page }) => {
    const login = new LoginPage(page);
    const nav   = new NavBar(page);
    const admin = new AdminUsersPage(page);

    await login.open();
    await login.login(creds.username, creds.password);

    await nav.openAdmin();
    await admin.open();
    await admin.search(creds.targetUser);
    await admin.openUser(creds.targetUser);
    await admin.resetPassword(creds.targetNewPass);

    await expect(page.locator('.oxd-toast')).toContainText(/success/i);


    await nav.logout();


    await login.login(creds.targetUser, creds.targetNewPass);
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
