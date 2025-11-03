# OrangeHRM E2E Testing – Playwright

End-to-end automated testing suite for the OrangeHRM demo web app, built with Playwright (JavaScript, ESM) using the Page Object Model (POM) pattern.
The project covers login, admin management, and employee CRUD workflows with data-driven test scenarios (JSON fixtures).


## Tech Stack

- Playwright (@playwright/test)
- JavaScript (ESM) – "type": "module"
- Page Object Model for test structure
- JSON fixtures for data-driven testing

## Project Structure

├─ e2e/\
│  └─ login.spec.js\
├─ fixtures/\
│  ├─ avatar.jpg\
│  └─ credentials.json      \    # demo: { "username": "Admin", "password": "admin123" }\
├─ pages\
│  └─ LoginPage.js\
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
TBD
### Positive End-to-End Tests
TBD
### Negative End-to-End Tests
TBD

---
### License
For educational and demo purposes only.