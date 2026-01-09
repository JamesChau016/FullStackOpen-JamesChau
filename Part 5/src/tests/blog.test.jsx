import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog.jsx'
import userEvent from '@testing-library/user-event'

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