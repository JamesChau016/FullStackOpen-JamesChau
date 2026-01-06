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
      setBlogs( blogs )
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
              setSucc={setSucc}/>
      </>
    )
  }
}

export default App