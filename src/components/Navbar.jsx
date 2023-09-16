import React ,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../App'

function Navbar() {
  const {state,dispatch} = useContext(UserContext)
  const navigate=useNavigate()
  const renderList = () =>{
    if(state){
      return [
        <>
        <li className="nav-wrapper blue lighten-3"><Link to="/profile">My profile</Link></li>
        <li className="nav-wrapper blue lighten-3"><Link to="/createpost">New Post</Link></li>
        <li className="nav-wrapper blue lighten-3">
        <button 
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          navigate('/login')
        }}
        className="btn waves-effect red darken-1"> Log Out </button> &nbsp;
        </li>
        </>
      ]
    }else{
      return[
        <>
        <li className="nav-wrapper blue lighten-3"><Link to="/login">Login</Link></li>
        <li className="nav-wrapper blue lighten-3"><Link to="/signup">Sign up</Link></li>       
        </>

      ]
    }
  }
  return (
    <nav className='navbar-fixed'>
    <div className="nav-wrapper blue lighten-3">
    <Link to={state?"/":"/login"} className="brand-logo left sitename"> &nbsp; TravelGram </Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
  
    
  )
}

export default Navbar