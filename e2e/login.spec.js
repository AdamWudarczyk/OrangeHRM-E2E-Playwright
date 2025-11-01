import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import creds from '../fixtures/credentials.json' with { type: 'json' };

test.describe('OrangeHRM - Login', () => {
  test('Successful login redirects to Dashboard', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open(creds.baseUrl);
    await login.login(creds.username, creds.password);
    await expect(login.dashboardHeader).toBeVisible();
  });

  test('Negative login - wrong password shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open(creds.baseUrl);

    await login.username.fill(creds.username);
    await login.password.fill('wrongPassword!');
    await login.loginBtn.click();

    await expect(login.error).toContainText(/Invalid credentials/i);
  });
});