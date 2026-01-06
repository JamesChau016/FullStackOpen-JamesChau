const Blog = ({ blogs, user }) => {

  return(
    <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {blogs.map((b,n)=>(
          <div key={b.id}>blog {n}: {b.title} {b.author}</div>
        ))}
    </div>
  )
}

export default Blog