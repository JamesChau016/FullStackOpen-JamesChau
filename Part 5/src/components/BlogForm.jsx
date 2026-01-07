import { useState } from 'react'
import blogService from '../services/blogs'


const BlogForm = ({ setBlogs, setSucc }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    const newBlog = {
      'title' : title,
      'author' : author,
      'url' : url
    }

    const _result = await blogService.create(newBlog)
    setBlogs(b => b.concat(newBlog))
    setSucc('created blog successfully')
    setTimeout(() => {
      setSucc(null)
    }, 5000)
  }


  return(
    <>
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
    </>
  )
}


export default BlogForm