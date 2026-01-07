import Toggle from './Toggle'
import BlogForm from './BlogForm'

const Blog = ({ blogs, setBlogs, user, setUser, setSucc }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
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

  const details = (blog) => {
    return(
      <>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button>like</button></div>
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
            {b.title} {b.author}&nbsp;
            <Toggle show={'view'} hide={'hide'}>
              {details(b)}
            </Toggle>
          </div>
        ))}
    </>
  )
}

export default Blog