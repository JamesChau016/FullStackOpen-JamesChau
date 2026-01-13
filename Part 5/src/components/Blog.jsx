import Toggle from './Toggle'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blog = ({ blogs, setBlogs, user, setUser, setSucc, handleLike }) => {
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


    const handleRemove = async (blog) => {
        if (window.confirm(`do you want to delete blog titled ${blog.title}`)){
            await blogService.deleteBlog(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        }
    }

    const handleCreate = async (newBlog) => {
        const result = await blogService.create(newBlog)
        const blogWithUser = {
            ...result,
            user:user
        }
        setBlogs(b => b.concat(blogWithUser))
        setSucc('created blog successfully')
        setTimeout(() => {
            setSucc(null)
        }, 5000)
    }

    const details = (blog) => {
        return(
            <div className='blog-detail'>
                <div>{blog.url}</div>
                <div>likes {blog.likes}&nbsp;<button onClick={() => handleLike(blog.id)}>like</button></div>
                <div>{user.name} </div>
                {console.log(user, blog)}
                {user.username === blog.user.username && (<><button onClick={() => handleRemove(blog)}>remove</button><br/></>)}
            </div>
        )
    }

    return(
        <>
            <p>{user.name} logged in &nbsp;<button onClick={handleLogOut}>log out</button></p>
            <Toggle show={'create new blog'} hide={'cancel'}>
                <BlogForm handleCreate={handleCreate}/>
            </Toggle>
            <br/>
            {blogs.map((b) => (
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