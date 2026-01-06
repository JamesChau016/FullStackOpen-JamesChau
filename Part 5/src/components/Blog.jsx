import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blogs, setBlogs, user, setUser }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const newBlog = {
      "title" : title,
      "author" : author,
      "url" : url
    }

    const result = await blogService.create(newBlog)
    setBlogs(b => b.concat(newBlog))
  }

  return(
    <div>
        <h2>blogs</h2>
        <p>{user.name} logged in &nbsp;<button onClick={handleLogOut}>log out</button></p>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            <label>title: &nbsp;
                <input
                  type = 'text'
                  value = {title}
                  onChange={t => setTitle(t.target.value)}
                />
            </label>
          </div>
          <div>
            <label>author: &nbsp;
                <input
                  type = 'text'
                  value = {author}
                  onChange={a => setAuthor(a.target.value)}
                />
            </label>
          </div>
          <div>
            <label>url: &nbsp;
                <input
                  type = 'text'
                  value = {url}
                  onChange={u => setUrl(u.target.value)}
                />
            </label>
          </div>
          <button type='submit'>create</button>
        </form>

        {blogs.map((b,n)=>(
          <div key={b.id}>blog {n}: {b.title} {b.author}</div>
        ))}
    </div>
  )
}

export default Blog