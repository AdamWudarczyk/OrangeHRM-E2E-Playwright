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

├─ e2e/\
│  └─ login.spec.js\
├─ pim.lifecycle.spec.js
└─ leave.apply.spec.js
├─ fixtures\
│  ├─ avatar.jpg\
│  └─ credentials.json      \    # demo: { "username": "Admin", "password": "admin123" }\
├─ pages\
│  └─ AdminUsersPage.js\
│  └─ LoginPage.js\
│  └─ LeavePage.js\
│  └─ NavBar.js\
│  └─ PIMPage.js\
├─ test-results\
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
```npx playwright test e2e/login.spec.js```

## Test Coverage

### Smoke Tests
- Login page loads and authenticates with valid credentials
- Invalid login shows error toast
### Positive End-to-End Tests
- Employee lifecycle (PIM): add employee → verify in list → verify in Admin → re-login as new user
- Leave request: apply for leave → verify request in “My Leave”
### Negative End-to-End Tests
- Login with invalid credentials
- Missing required fields in Add Employee form

---
### License
For educational and demo purposes only.