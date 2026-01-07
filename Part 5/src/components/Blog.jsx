import Toggle from './Toggle'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blog = ({ blogs, setBlogs, user, setUser, setSucc }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setSucc('logged out')
    setTimeout(() => {
      setSucc(null)
    },5000)
  }

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id===id)
    const newLike = blog.likes +1
    const newBlog = {...blog, likes: newLike}
    const respone = await blogService.change(id, newBlog)
    setBlogs(blogs.map(b => b.id===id ? newBlog : b))
    setSucc(`you liked a blog titled ${blog.title}`)
        setTimeout(() => {
            setSucc(null)
      }, 5000)
  }

  const details = (blog) => {
    return(
      <>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={() => handleLike(blog.id)}>like</button></div>
        <div>{user.name}</div>
      </>
    )
  }

  return(
    <>
        <p>{user.name} logged in &nbsp;<button onClick={handleLogOut}>log out</button></p>
        <Toggle show={'create new blog'} hide={'cancel'}>
          <BlogForm setBlogs={setBlogs}
                    setSucc={setSucc}/>
        </Toggle>
        {blogs.map((b,n)=>(
          <div style = {blogStyle} key={b.id}>
            {b.title} {b.author}
            <Toggle show={'view'} hide={'hide'}>
              {details(b)}
            </Toggle>
          </div>
        ))}
    </>
  )
}

export default Blog