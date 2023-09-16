import React,{useState,useContext} from 'react'
import logoimg from './imgs/logoimg.png'
import { Link,useNavigate } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css';

function Login() {
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");

  const PostData = () => {
    if (phoneno.trim() === "" || password.trim()==="") {
      M.toast({ html: "All fields are required", classes: "red darken-1" });
      return;
    }

    if (!/^\d{10}$/.test(phoneno)) {
      M.toast({ html: "Invalid Phone Number", classes: "red darken-1" });
      return;
    }

    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phoneno,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "red darken-1" });
        } else {
          
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER", payload:data.user})
          M.toast({ html: "Login Successful", classes: "green accent-4" });
          navigate('/'); // Use navigate to redirect
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
        <img src={logoimg} alt='logo' style={{ width: '350px' , backgroundColor: 'rgba(255, 255, 255, 0)'}} />
        <input type="Number" placeholder="Phone Number" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn waves-effect blue darken-2" onClick={PostData}>Login
      </button>
      <p className='ptag'>  
        <Link to='/signup'>Not yet registered, Click here to Sign up </Link>  
      </p>   
      </div>
    </div>
  )
}

export default Login