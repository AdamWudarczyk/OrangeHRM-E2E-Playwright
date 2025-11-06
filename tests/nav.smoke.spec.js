import { test, expect } from '@playwright/test';
import creds from '../fixtures/credentials.json' with { type: 'json' };

import { LoginPage } from '../pages/LoginPage.js';
import { NavBar } from '../pages/NavBar.js';

test('Smoke: main menu visible after login + PIM navigation works', async ({ page }) => {
    const login = new LoginPage(page);
    const nav   = new NavBar(page);

    await login.goto();
    await login.login(creds.username, creds.password);

    await nav.waitReady();

    await expect(nav.menuItem('Admin')).toBeVisible();
    await expect(nav.menuItem('PIM')).toBeVisible();
    await expect(nav.menuItem('Leave')).toBeVisible();

    await nav.openPIM();
    await expect(page).toHaveURL(/pim\/viewEmployeeList/i);
});