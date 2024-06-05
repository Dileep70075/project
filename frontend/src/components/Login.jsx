import axios from "axios";
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const [data,setData] = useState({
        username:'',
        password:'',
    })
    const login = (e) =>{
        const {name,value} = e.target;
        setData({...data,[name]:value})
    }
    const Navigate = useNavigate();
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
const response = await axios.post("http://localhost:3007/login",data);
if(response && response.data){
    console.log(response.data);
    localStorage.setItem('userData',JSON.stringify(response.data))
    Navigate('/admin');
}
        }
        catch(error){
console.error('error during login',error)
        }
    }
  return (
    <div className='signup-container' >
        <form onSubmit={handleLogin} className='signup-form'>
        <label htmlFor="username">UserName</label><br/>
        <input type="text" autoComplete='off' name='username' value={data.username} onChange={login}/><br/>
        <label htmlFor="password">Password</label><br/>
        <input type="password" name='password' value={data.password} onChange={login} /><br/>
        <select
          id="role"
          name="role"
          value={data.role}
          onChange={login}
          style={styles.input}
          
        >
          <option value="role">Role</option>
          <option value="teacher">Teacher</option>
          <option value="principal">Principal</option>
          <option value="student">Student</option>
        </select>
        <button style={{"font-size": '1rem'}} type='submit'>Login</button>
        </form>
        <p className="p">Create New Account ? <Link to='/' className="span">Sign Up</Link></p>

    </div>
  )
}

const styles ={
  input: {
    // border:'2px solid white',
    backgroundColor:"454343",
    width: '100%',
    padding: '8px',
    marginBottom: '5px',
    boxSizing: 'border-box',
  }
}

export default Login