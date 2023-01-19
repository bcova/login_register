import React, { useState } from "react";
import {userLogin} from '../apiAdapter/index'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(null)

    const handleSubmit = async (event) => {
      try {
        event.preventDefault();
        const result = await userLogin(username, password);
        const token =result.token
        
        if(result.error){
          setError(result)
        }
        else if(token){ 
          setError(null)
          const username = result.user.username
          localStorage.setItem("username",username);
          localStorage.setItem("token", token);
        }
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input  onChange={({ target }) => setUsername(target.value)}
                  value={username}
                  id="username" placeholder="username"></input>
          <input value={password}
                  id="password"
                  name="password"
                  type="password"
                  onChange={({ target }) => setPassword(target.value)}
                  required placeholder="password"></input>
          <button type="submit">LOGIN</button>
        </form>
    </div>
  )
}

export default Login