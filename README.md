# 🎭 SauceDemo Playwright Automation Framework

> A comprehensive E2E test automation framework for [SauceDemo](https://www.saucedemo.com) built with **Playwright** and **TypeScript**, following industry best practices.

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 🏗️ Architecture

    ┌─────────────────────────────────────────┐
    │              Test Layer                  │
    │  (Smoke, E2E, Visual Regression Tests)  │
    ├─────────────────────────────────────────┤
    │           Fixture Layer                  │
    │     (Custom Fixtures, Test Setup)        │
    ├─────────────────────────────────────────┤
    │         Page Object Layer                │
    │  (LoginPage, InventoryPage, CartPage,    │
    │   CheckoutPage)                          │
    ├─────────────────────────────────────────┤
    │          Utility Layer                   │
    │  (Helpers, Data Generators, Constants)   │
    ├─────────────────────────────────────────┤
    │       Playwright Engine                  │
    │  (Browser Automation, Auto-waiting,      │
    │   Network Interception)                  │
    └─────────────────────────────────────────┘

## 📁 Project Structure

    saucedemo-playwright-automation/
    ├── .github/workflows/       # CI/CD pipeline
    ├── src/
    │   ├── pages/               # Page Object Models
    │   │   ├── LoginPage.ts
    │   │   ├── InventoryPage.ts
    │   │   ├── CartPage.ts
    │   │   └── CheckoutPage.ts
    │   ├── fixtures/            # Custom test fixtures
    │   │   └── test-fixtures.ts
    │   └── utils/               # Helper utilities
    │       └── test-helpers.ts
    ├── tests/
    │   ├── smoke/               # Smoke tests
    │   ├── e2e/                 # End-to-end tests
    │   └── visual/              # Visual regression tests
    ├── test-data/               # External test data
    │   ├── users.json
    │   ├── products.json
    │   └── checkout.json
    ├── playwright.config.ts     # Playwright configuration
    └── package.json

## 🧪 Test Coverage

| Category | Tests | Coverage |
|----------|-------|----------|
| Login (Smoke) | 9 | Authentication, validation, error handling |
| Inventory (E2E) | 13 | Products, sorting, cart operations |
| Checkout (E2E) | 6 | Form validation, order flow |
| Purchase Flow (E2E) | 3 | Complete user journey |
| Visual Regression | 4 | UI consistency checks |
| **Total** | **35** | **Full user journey coverage** |

## 🏷️ Test Tags

| Tag | Purpose | Command |
|-----|---------|---------|
| `@smoke` | Quick health check | `npm run test:smoke` |
| `@critical` | Business-critical flows | `npm run test:critical` |
| `@regression` | Full test suite | `npm run test:regression` |
| `@visual` | Visual regression | `npm run test:visual` |

## 🌐 Cross-Browser Support

- ✅ Chromium (Desktop Chrome)
- ✅ Firefox
- ✅ WebKit (Desktop Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v9+)
- Git

### Installation

    git clone https://github.com/chandimananayakkara/saucedemo-playwright-automation
    cd saucedemo-playwright-automation
    npm install
    npx playwright install

### Running Tests

    # All tests
    npm test

    # Smoke tests (fast)
    npm run test:smoke

    # With browser visible
    npm run test:headed

    # Interactive UI mode
    npm run test:ui

    # Specific browser
    npm run test:chromium
    npm run test:firefox
    npm run test:webkit

### Reports

    # Playwright HTML report
    npm run report

    # Allure report
    npm run report:allure

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright | Browser automation |
| TypeScript | Type-safe test code |
| GitHub Actions | CI/CD pipeline |
| Allure | Test reporting |
| Page Object Model | Design pattern |
| Custom Fixtures | Test setup reuse |

## 📊 Design Patterns & Best Practices

- **Page Object Model (POM)** — Encapsulated page interactions
- **Custom Fixtures** — Reusable login state
- **Data-Driven Testing** — External JSON test data
- **Test Tagging** — Organized test execution
- **DRY Principle** — No code duplication
- **Visual Regression** — UI consistency verification
- **Cross-Browser Testing** — 5 browser configurations
- **CI/CD Integration** — Automated test runs on push/PR

## 👤 Author

**Your Name**
- GitHub: [@chandimananayakkara](https://github.com/chandimananayakkara)
- LinkedIn: [Chandima Nanayakkara](hhttps://www.linkedin.com/in/chandima-nanayakkara/)