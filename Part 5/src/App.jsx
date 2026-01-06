import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm  from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

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
    }
  }, [])

  if (!user){
    return(
      <LoginForm username={username}
                password={password}
                setUsername= {setUsername}
                setPassword= {setPassword}
                user={user}
                setUser={setUser}/>
    )
  }
  else{
    return(
      <Blog blogs={blogs} user={user} setUser={setUser}/>
    )
  }
}

export default App