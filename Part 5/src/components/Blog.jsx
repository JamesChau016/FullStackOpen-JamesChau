import Toggle from './Toggle'
import BlogForm from './BlogForm'

const Blog = ({ blogs, setBlogs, user, setUser, setSucc }) => {

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setSucc('logged out')
    setTimeout(() => {
      setSucc(null)
    },5000)
  }

  return(
    <>
        <p>{user.name} logged in &nbsp;<button onClick={handleLogOut}>log out</button></p>
        <Toggle>
          <BlogForm setBlogs={setBlogs}
                    setSucc={setSucc}/>
        </Toggle>
        {blogs.map((b,n)=>(
          <div key={b.id}>blog {n}: {b.title} {b.author}</div>
        ))}
    </>
  )
}

export default Blog