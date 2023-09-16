
// import React, { useState } from 'react';
// import logoimg from './imgs/logoimg.png';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// import M from 'materialize-css';

// function Signup() {
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory
//   const [username, setUsername] = useState("");
//   const [phoneno, setPhoneno] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const PostData = () => {
//     if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
//       M.toast({ html:"Invalid Email id", classes: "red darken-1" });
//       return
//     }
//     fetch("/signup", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         username,
//         phoneno,
//         email,
//         password
//       })
//     }).then(res => res.json()).then(data => {
//       if (data.error) {
//         M.toast({ html: data.error, classes: "red darken-1" });
//       } else {
//         M.toast({ html: data.message, classes: "green accent-4" });
//         navigate('/login'); // Use navigate to redirect
//       }
//     });
//   }

//   return (
//     <div className='mycard'>
//       <div className="card auth-card input-field">
//         <img src={logoimg} alt='logo' style={{ width: '350px', backgroundColor: 'rgba(255, 255, 255, 0)' }} />
//         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//         <input type="Number" placeholder="Phone Number" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} />
//         <input type="text" placeholder="Email id" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <br />
//         <button onClick={PostData} className="btn waves-effect blue darken-2">Sign up</button>
//         <br />
//         <p className='ptag'>
//           <Link to='/login'> Already having an account, Click here to login </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Signup;


import React, { useEffect, useState } from 'react';
import logoimg from './imgs/logoimg.png';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import M from 'materialize-css';

function Signup() {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [username, setUsername] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("")
  const [url, setUrl] = useState(undefined)


  useEffect(()=>{
    if(url){
      uploadFields()
    }
  },[url])

  const uploadPic = () =>{
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "travelgram-app");
    data.append("cloud_name", "vishnuscloud");

    // Upload the image to Cloudinary
    fetch("https://api.cloudinary.com/v1_1/vishnuscloud/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        // Update the url state with the image URL obtained from Cloudinary
        setUrl(data.url);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const uploadFields = ()=>{

    if (email.trim() === "" || phoneno.trim() === "" || username.trim() === "" || password.trim()==="") {
      M.toast({ html: "All fields are required", classes: "red darken-1" });
      return;
    }

    if (!/^\d{10}$/.test(phoneno)) {
      M.toast({ html: "Invalid Phone Number", classes: "red darken-1" });
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      M.toast({ html: "Invalid Email Address", classes: "red darken-1" });
      return;
    }

    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        phoneno,
        email,
        password,
        pic:url
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "red darken-1" });
        } else {
          M.toast({ html: data.message, classes: "green accent-4" });
          navigate('/login'); // Use navigate to redirect
        }
      }).catch(err=>{
        console.log(err);
      })


  }

  const PostData = () => {

    if(photo){
      uploadPic()
    }
    else{
      uploadFields()
    }
    
  }

  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
        <img src={logoimg} alt='logo' style={{ width: '350px', backgroundColor: 'rgba(255, 255, 255, 0)' }} />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="Number" placeholder="Phone Number" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} />
        <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="file-field input-field white">
        <div className="btn  blue-grey lighten-5">
          <span style={{ color: 'black', backgroundColor: 'white' }}>Upload Profile Pic</span>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper white">
          <input className="file-path validate" type="text" />
        </div>
      </div>
        <br />
        <button onClick={PostData} className="btn waves-effect blue darken-2">Sign up</button>
        <br />
        <p className='ptag'>
          <Link to='/login'> Already have an account? Click here to login </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup;

