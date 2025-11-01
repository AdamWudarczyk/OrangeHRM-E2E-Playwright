export class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.error    = page.locator('.oxd-alert .oxd-alert-content-text');
        this.dashboardHeader = page.getByRole('heading', { name: /dashboard/i });
    }

    async open(baseUrl) {
        await this.page.goto(`${baseUrl}/web/index.php/auth/login`, { waitUntil: 'domcontentloaded' });
        await this.username.waitFor();
    }

    async login(user, pass) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await Promise.all([
            this.page.waitForURL(/dashboard/),
            this.loginBtn.click()
        ]);
    }
}
