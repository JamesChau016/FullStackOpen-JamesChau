const login = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', {name: 'login'}).click()
}

const createBlog = async (page, blog) => {
    await page.getByLabel('title').fill(blog.title)
    await page.getByLabel('author').fill(blog.author)
    await page.getByLabel('url').fill(blog.url)
    await page.getByRole('button', {name: 'create'}).click()
    await page.getByText(blog.title).waitFor()
}

module.exports = {
    login,
    createBlog
}