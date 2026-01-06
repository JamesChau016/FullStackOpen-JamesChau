const Blog = ({ blogs, user, setUser }) => {
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }
  return(
    <div>
        <h2>blogs</h2>
        <p>{user.name} logged in &nbsp;<button onClick={handleLogOut}>log out</button></p>
        {blogs.map((b,n)=>(
          <div key={b.id}>blog {n}: {b.title} {b.author}</div>
        ))}
    </div>
  )
}

export default Blog