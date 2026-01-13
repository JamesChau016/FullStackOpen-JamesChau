const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./test_helper')

describe('Blog app', () => {
  const blog = {
    title: 'test blog',
    author: 'admin',
    url: 'url.com'
  }

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
      await login(page, 'admin', 'admin')

      await expect(page.getByText('admin logged in')).toBeVisible()
    })

    test('login failed', async ({page}) => {
      await login(page, 'admin', 'wrong')

      await expect(page.getByRole('button', {name: 'log out'})).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'admin', 'admin')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, blog)

      await expect(page.getByText('test blog')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, blog)

      await page.getByRole('button', {name: 'view'}).click()
      await page.getByRole('button', {name: 'like'}).click()

      await expect(page.getByText('you liked a blog titled test blog')).toBeVisible()
    })

    test('delete a blog', async ({ page }) => {
      await createBlog(page, blog)

      await page.getByRole('button', {name: 'view'}).click()

      page.on('dialog', dialog => dialog.accept())
      await expect(page.getByRole('button', {name: 'remove'})).toBeVisible()

      await expect(page.getByText('test blog')).not.toBeVisible()
    })

    test('delete button only show for the creator of that blog', async ({ page })=> {
      await createBlog(page, blog)

      await page.getByRole('button', {name: 'log out'}).click()

      await login(page, 'user', 'user')

      await expect(page.getByText('user logged in')).toBeVisible()
      await page.getByRole('button', {name: 'view'}).click()
      await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
    })
  })
})