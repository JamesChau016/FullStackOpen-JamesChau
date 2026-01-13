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
    await request.post('http://localhost:3003/api/users', {
      data:{
          "name": "user",
          "username": "user",
          "password": "user"
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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('admin')
      await page.getByLabel('password').fill('admin')
      await page.getByRole('button', {name: 'login'}).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', {name: 'create new blog'}).click()
      await page.getByLabel('title').fill('test create blog')
      await page.getByLabel('author').fill('admin')
      await page.getByLabel('url').fill('url.com')
      await page.getByRole('button', {name: 'create'}).click()

      await expect(page.getByText('test create blog')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', {name: 'create new blog'}).click()
      await page.getByLabel('title').fill('test create blog')
      await page.getByLabel('author').fill('admin')
      await page.getByLabel('url').fill('url.com')
      await page.getByRole('button', {name: 'create'}).click()

      await page.getByRole('button', {name: 'view'}).click()
      await page.getByRole('button', {name: 'like'}).click()

      await expect(page.getByText('you liked a blog titled test create blog')).toBeVisible()
    })

    test('delete a blog', async ({ page }) => {
      await page.getByRole('button', {name: 'create new blog'}).click()
      await page.getByLabel('title').fill('test create blog')
      await page.getByLabel('author').fill('admin')
      await page.getByLabel('url').fill('url.com')
      await page.getByRole('button', {name: 'create'}).click()

      await page.getByRole('button', {name: 'view'}).click()

      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', {name: 'remove'}).click()

      
      await expect(page.getByText('test create blog')).not.toBeVisible()
    })

    test('delete button only show for the creator of that blog', async ({ page })=> {
      await page.getByRole('button', {name: 'create new blog'}).click()
      await page.getByLabel('title').fill('test create blog')
      await page.getByLabel('author').fill('admin')
      await page.getByLabel('url').fill('url.com')
      await page.getByRole('button', {name: 'create'}).click()

      await page.getByRole('button', {name: 'log out'}).click()
      await page.getByLabel('username').fill('user')
      await page.getByLabel('password').fill('user')
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('user logged in')).toBeVisible()
      await page.getByRole('button', {name: 'view'}).click()
      await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
    })
  })
})