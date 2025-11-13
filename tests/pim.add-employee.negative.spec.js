import { test, expect } from '@playwright/test';
import creds from '../fixtures/credentials.json' with { type: 'json' };

import { LoginPage } from '../pages/LoginPage.js';
import { NavBar } from '../pages/NavBar.js';
import { PIMPage } from '../pages/PIMPage.js';

test('Negative: Add Employee shows required field validation', async ({ page }) => {
    const login = new LoginPage(page);
    const nav   = new NavBar(page);
    const pim   = new PIMPage(page);

    await login.goto();
    await login.login(creds.username, creds.password);

    await nav.openPIM();
    await pim.openAdd();

    await pim.save();
    await expect(pim.errorFor('firstName')).toHaveText(/required/i);

});
