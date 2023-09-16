

import React, { useState, useEffect, useCallback } from 'react';
import logoimg from './imgs/logoimg.png';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';

function CreatePost() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [brief, setBrief] = useState("");
  const [nearairport, setNearairport] = useState("");
  const [nearrailway, setNearrailway] = useState("");
  const [howtoroam, setHowtoroam] = useState("");
  const [costperday, setCostperday] = useState("");
  const [besttime, setBesttime] = useState("");
  const [photo, setPhoto] = useState("");
  const [url, setUrl] = useState(""); // Keep photourl state

  const postDetails = useCallback(() => {
    if (!location || !brief || !nearairport || !nearrailway || !howtoroam || !costperday || !besttime || !photo) {
      M.toast({ html: "Please fill in all fields", classes: "red darken-1" });
      return;
    }

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
  }, [location, brief, nearairport, nearrailway, howtoroam, costperday, besttime, photo]);

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          location,
          brief,
          nearairport,
          nearrailway,
          howtoroam,
          costperday,
          besttime,
          pic: url 
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            M.toast({ html: data.error, classes: "red darken-1" });
          } else {
            M.toast({ html: "Created post successfully", classes: "green accent-4" });
            navigate('/');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [url, navigate, location, brief, nearairport, nearrailway, howtoroam, costperday, besttime]);

  return (
    <div className="card input-field"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center"
      }}>
      <img src={logoimg} alt='logo' style={{ width: '300px', backgroundColor: 'rgba(255, 255, 255, 0)' }} />
      {/* Your input fields here */}
      <input type="text" placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="text" placeholder='Brief' value={brief} onChange={(e) => setBrief(e.target.value)} />
      <input type="text" placeholder='Nearest Airport' value={nearairport} onChange={(e) => setNearairport(e.target.value)} />
      <input type="text" placeholder='Nearest Railway Station' value={nearrailway} onChange={(e) => setNearrailway(e.target.value)} />
      <input type="text" placeholder='Roam around transportation' value={howtoroam} onChange={(e) => setHowtoroam(e.target.value)} />
      <input type="text" placeholder='Average cost per day' value={costperday} onChange={(e) => setCostperday(e.target.value)} />
      <input type="text" placeholder='Best season' value={besttime} onChange={(e) => setBesttime(e.target.value)} />

      {/* file photo input */}
      <div className="file-field input-field white">
        <div className="btn  blue-grey lighten-5">
          <span style={{ color: 'black', backgroundColor: 'white' }}>Upload Image File</span>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper white">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <button className="btn waves-effect blue darken-2" onClick={postDetails}>Submit Post</button>
    </div>
  )
}

export default CreatePost;






