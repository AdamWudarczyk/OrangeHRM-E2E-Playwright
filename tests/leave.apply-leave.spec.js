import { test, expect } from '@playwright/test';
import creds from '../fixtures/credentials.json' with { type: 'json' };
import { LoginPage } from '../pages/LoginPage.js';
import { NavBar } from '../pages/NavBar.js';
import { LeavePage } from '../pages/LeavePage.js';

test('E2E Leave: apply for leave and verify in My Leave', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto(creds.baseUrl);
    await login.login(creds.username, creds.password);
    await expect(login.heading).toBeVisible();

    const nav = new NavBar(page);
    await nav.openLeave();

    const leave = new LeavePage(page);
    await leave.openApply();
    await leave.applyFirstAvailableTypeForToday();

    await leave.openMyLeave();
    expect(await leave.hasAtLeastOneRow()).toBeTruthy();
});
