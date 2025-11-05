# OrangeHRM E2E Testing – Playwright
Comprehensive automated testing framework for the OrangeHRM demo application, developed with Playwright (JavaScript, ESM) using the Page Object Model structure.
Covers smoke, functional (positive & negative), and end-to-end test scenarios for login, admin, and employee management modules.

## Tech Stack

- **Playwright** (@playwright/test)
- **JavaScript** (ESM) – "type": "module"
- **Page Object Model** for test structure
- **JSON** fixtures for data-driven testing
- **HTML reporting** via Playwright Test Runner

## Project Structure

├─ fixtures\
│  ├─ avatar.jpg\
│  └─ credentials.json      \    # demo: { "username": "Admin", "password": "admin123" }\
├─ pages\
│  └─ AdminUsersPage.js\
│  └─ LoginPage.js\
│  └─ LeavePage.js\
│  └─ NavBar.js\
│  └─ PIMPage.js\
├─ tests/\
│  ├─ admin.filter-role.spec.js\
│  ├─ admin.search-nonexistent-user.spec.js\
│  ├─ leave.apply-leave.spec.js\
│  ├─ login.smoke.spec.js\
│  ├─ nav.smoke.spec.js\
│  ├─ pim.add-employee.negative.spec.js\
│  ├─ pim.lifecycle.spec.js\
│  └─ reset-password.spec.js\
├─ pim.lifecycle.spec.js\
└─ leave.apply-leave.spec.js\
│\
├─ playwright.config.js\
├─ package.json\
└─ README.md\

## Prerequisites
- Node.js 18+
- Playwright browsers (installed via command below)

```bash
npm ci
npx playwright install 
```
## Running Tests

Run all tests\
```npx playwright test```

Run in UI mode\
```npx playwright test --ui```

Run with browser visible\
```npx playwright test --headed```

Run a specific spec file\
```npx playwright test e2e/login.smoke.spec.js```

## Test Coverage

### Smoke Tests
- Verify login page loads successfully
- Verify navigation bar links (PIM, Leave, Admin)
### Positive End-to-End Tests
- Add and manage employee lifecycle (create → verify → update → delete)
- Apply leave request and validate in "My Leave"
- Password reset flow for target user
### Negative End-to-End Tests
- Add employee with missing required fields (validation messages)
- Search for non-existent user in Admin panel
- Invalid login attempt shows proper error message

---
### License
For educational and demo purposes only.