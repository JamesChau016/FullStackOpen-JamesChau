import { useState } from 'react' 
import loginService from '../services/login'

const LoginForm = ({username, password, setUsername, setPassword, setUser}) => {

    const handleLogin = async (e) =>{
        e.preventDefault()
        try{
            const user = await loginService.login({username, password})
            setUser(user)
            setUsername('')
            setPassword('')
            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
              ) 
        }
        catch (error){
            console.log('wrong password')
            console.log(error)
        }
    }
    return(
        <>
            <h1>Log in</h1>
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