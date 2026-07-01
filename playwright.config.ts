import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  testDir: './tests',
  timeout:30*1000,
  expect:{
    timeout:5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot:'on',
    video:'retain-on-failure',
    baseURL:'https://www.saucedemo.com/',
    navigationTimeout:30*1000,
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name:'mobile-chrome',
      use:{...devices['Pixel 5']}
    },
    {
      name:'mobile-safari',
      use:{...devices['iPhone 12']}
    }
  ],
});
