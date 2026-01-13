import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm  from './components/Login'
import Noti from './components/Noti'
import blogService from './services/blogs'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [succ, setSucc] = useState(null)
    const [err, setErr] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a,b) => b.likes-a.likes) )
        )
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedInUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLike = async (id) => {
        const blog = blogs.find(b => b.id===id)
        const newLike = blog.likes +1
        const newBlog = { ...blog, likes: newLike }
        await blogService.change(id, newBlog)
        const newBlogList = blogs.map(b => b.id===id ? newBlog : b)
        setBlogs(newBlogList.sort((a,b) => b.likes - a.likes))
        setSucc(`you liked a blog titled ${blog.title}`)
        setTimeout(() => {
            setSucc(null)
        }, 5000)
    }


    if (!user){
        return(
            <>
                <h1>Log in</h1>
                <Noti err={err} succ={succ}/>
                <LoginForm username={username}
                    password={password}
                    setUsername= {setUsername}
                    setPassword= {setPassword}
                    user={user}
                    setUser={setUser}
                    setErr={setErr}
                    setSucc={setSucc}/>
            </>
        )
    }
    else{
        return(
            <>
                <h2>blogs</h2>
                <Noti err={err} succ={succ}/>
                <Blog blogs={blogs}
                    setBlogs={setBlogs}
                    user={user}
                    setUser={setUser}
                    setErr={setErr}
                    setSucc={setSucc}
                    handleLike={handleLike}/>
            </>
        )
    }
}

export default App