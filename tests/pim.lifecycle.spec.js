import { test, expect } from '@playwright/test';
import creds from '../fixtures/credentials.json' with { type: 'json' };
import { LoginPage } from '../pages/LoginPage.js';
import { NavBar } from '../pages/NavBar.js';
import { PIMPage } from '../pages/PIMPage.js';
import { AdminUsersPage } from '../pages/AdminUsersPage.js';

test('E2E PIM: add employee with login -> verify -> re-login', async ({ page }) => {
    const uniq = Date.now();
    const first = `QA${uniq}`;
    const last  = 'User';
    const full  = `${first} ${last}`;
    const newUser = `qa_user_${uniq}`;
    const newPass = 'Passw0rd!';

    const login = new LoginPage(page);
    await login.goto(creds.baseUrl);
    await login.login(creds.username, creds.password);
    await expect(login.heading).toBeVisible();

    const nav = new NavBar(page);
    await nav.openPIM();

    const pim = new PIMPage(page);
    await pim.addEmployeeWithLogin({ first, last, username: newUser, password: newPass });
    await expect(pim.toast).toContainText(/success/i);

    await pim.openList();
    await pim.searchByFullName(full, first);
    await expect(pim.rows).toHaveCount(1);

    await nav.openAdmin();
    const adminUsers = new AdminUsersPage(page);
    await adminUsers.search(newUser);
    await expect(adminUsers.rows).toHaveCount(1);
    await expect(adminUsers.rows.first()).toContainText(newUser);

    await nav.logout();
    await expect(page.getByPlaceholder('Username')).toBeVisible();


    await page.getByPlaceholder('Username').fill(newUser);
    await page.getByPlaceholder('Password').fill(newPass);
    await Promise.all([
        page.waitForURL(/dashboard/),
        page.getByRole('button', { name: 'Login' }).click(),
    ]);
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
