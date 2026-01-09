import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'


const blogs = [
    {
        'title': 'blog rendering test',
        'author': 'Jammie',
        'url': 'abc.com',
        'likes': 7
    },
]

const user = {
    'username': 'Jimmy',
    'name': 'James'
}

test('renders content', () => {

    render(<Blog blogs={blogs} user={user}/>)

    const title = screen.getByText('blog rendering test', { exact: false })
    expect(title).toBeDefined()

    const author = screen.queryByText('Jammie')
    const url = screen.queryByText('url')
    const likes = screen.queryByText('likes')

    expect(author).toBeNull()
    expect(url).toBeNull()
    expect(likes).toBeNull()
})

test('view details button', async () => {

    render(<Blog blogs={blogs} user={user}/>)

    const mockUser = userEvent.setup()
    const button = screen.getByText('view')
    await mockUser.click(button)

    const url = screen.queryByText('url')
    const likes = screen.queryByText('likes')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
})

test('test like button', async () => {
    const likeHandler = vi.fn()
    render(<Blog blogs={blogs} user={user} handleLike={likeHandler}/>)

    const mockUser = userEvent.setup()
    const button = screen.getByText('like')
    await mockUser.click(button)
    await mockUser.click(button)

    expect(likeHandler.mock.calls).toHaveLength(2)
})

test('blog form test', async () => {
    const createBlog = vi.fn()
    const mockUser = userEvent.setup()

    render(<BlogForm handleCreate={createBlog}/>)

    const titleInput = screen.getByLabelText('title:',{ exact: false })
    const authorInput = screen.getByLabelText('author:',{ exact: false })
    const urlInput = screen.getByLabelText('url:',{ exact: false })
    const createBtn = screen.getByText('create')

    await mockUser.type(titleInput, 'test form title input')
    await mockUser.type(authorInput, 'test form author input')
    await mockUser.type(urlInput, 'test form url input')
    await mockUser.click(createBtn)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test form title input')
    expect(createBlog.mock.calls[0][0].author).toBe('test form author input')
    expect(createBlog.mock.calls[0][0].url).toBe('test form url input')
})