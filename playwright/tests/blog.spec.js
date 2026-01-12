const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
        data:{
            "name": "admin",
            "username": "admin",
            "password": "admin"
        }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByRole('heading', {name: 'Log in'})
    await expect(locator).toBeVisible()
    await expect(page.getByRole('button', {name: 'login'})).toBeVisible()
  })

  describe('login', () => {
    test('login successful', async ({page}) => {
        await page.getByLabel('username').fill('admin')
        await page.getByLabel('password').fill('admin')
        await page.getByRole('button', {name: 'login'}).click()

        await expect(page.getByText('admin logged in')).toBeVisible()
    })

    test('login failed', async ({page}) => {
        await page.getByLabel('username').fill('admin')
        await page.getByLabel('password').fill('wrong')
        await page.getByRole('button', {name: 'login'}).click()

        await expect(page.getByRole('button', {name: 'log out'})).not.toBeVisible()
    })
  })
})