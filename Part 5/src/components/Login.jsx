import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ username, password, setUsername, setPassword, setUser, setErr, setSucc }) => {

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      setUser(user)
      setSucc('logged in successful')
      setTimeout(() => {
        setSucc(null)
      }, 5000)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

    }
    catch (error){
      console.log(error)
      setErr('wrong username or password')
      setTimeout(() => {
        setErr(null)
      }, 5000)
    }
  }
  return(
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label>username: &nbsp;
            <input
              type = "text"
              value = {username}
              onChange = {(u) => setUsername(u.target.value)}
            />
          </label>
        </div>
        <div>
          <label>password: &nbsp;
            <input
              type = "password"
              value = {password}
              onChange = {(p) => setPassword(p.target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}


export default LoginForm