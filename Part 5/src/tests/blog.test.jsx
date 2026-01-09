import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog.jsx'


test('renders content', () => {
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