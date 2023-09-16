// import React, { useEffect, useState, useContext } from 'react';
// import { UserContext } from '../../App'
// import M from 'materialize-css';

// function Profile() {
//   const [mypics, setMypics] = useState([])
//   const { state, dispatch } = useContext(UserContext)
//   useEffect(() => {
//     fetch('/mypost', {
//       headers: {
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       }
//     }).then(res => res.json())
//       .then(result => {
//         console.log(result);
//         setMypics(result.mypost)
//       })
//   }, [])

//   const deletepost = (postid) => {
//     fetch(`/deletepost/${postid}`, {
//       method: "delete",
//       headers: {
//         'Authorization': "Bearer " + localStorage.getItem("jwt")
//       }
//     }).then(res => res.json())
//       .then(result => {
//         console.log(result);
//         const newData = mypics.filter(item => {
//           return item._id !== result._id
//         })
//         M.toast({ html: "Post Deleted Successfully", classes: "red darken-1" });
//         setMypics(newData)
//       })
//   }

//   return (
//     <div>
//       <div style={{
//         display: 'flex',
//         flexDirection: 'row', // Stack elements in portrait view
//         alignItems: 'center', // Center content horizontally
//         margin: "50px 0px",
//         padding: '0 20px', // Add padding for smaller screens
//       }}>
//         <div className="image-container">
//           <img
//             src={state && state.pic ? state.pic : (state && state.updatedUser ? state.updatedUser.pic : "")}
//             alt=""
//             className="image"
//           />
//         </div>
//         <div style={{ textAlign: 'center', width: '100%' }}>
//           <h5>{state && state.username ? state.username : (state && state.updatedUser ? state.updatedUser.username: 0)}</h5>
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <h6>{mypics?.length} Posts</h6>
//             <h6>{state && state.followers ? state.followers.length : (state && state.updatedUser ? state.updatedUser.followers.length : 0)} Followers</h6>
//             <h6>{state && state.following ? state.following.length : (state && state.updatedUser ? state.updatedUser.following.length : 0)} Following</h6>
//           </div>
//         </div>
//       </div>
//       <br /><br />

//       <div className="gallery">
//         {
//           mypics.map(item => {
//             return (
//               <div className="row center-card">
//                 <div className="col s12">
//                   <div className="card">
//                     <br />
//                     <i className="material-icons deleteicon " onClick={() => deletepost(item._id)} >delete_forver</i>
//                     <div className="card-image">
//                       <img key={item._id} style={{ width: '100%' }} src={item.photo} alt="" />
//                       <span className="card-title locationtitle">{item.location}</span>
//                     </div>
//                     <div className="card-content inputbox">
//                       <h6>{item.brief}</h6>
//                       <h6>Local & Transportation : {item.howtoroam}</h6>
//                       <h6>Best Time : {item.besttime}</h6>
//                       <h6>Nearest Airport : {item.nearairport}</h6>
//                       <h6>Nearest Railway : {item.nearrailway}</h6>
//                       <h6>Avrage cost per day : {item.costperday}</h6>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           })
//         }

//       </div>
//     </div>
//   )
// }

// export default Profile;


import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App'
import M from 'materialize-css';

function Profile() {
  const [mypics, setMypics] = useState([])
  const {state, dispatch } = useContext(UserContext)
  const [photo, setPhoto] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    fetch('/mypost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setMypics(result.mypost)
      })
  }, [])


  useEffect(()=>{

      if(photo){
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
        console.log(data);
        // Update the url state with the image URL obtained from Cloudinary
        setUrl(data.url);
        // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
        // dispatch({type:"UPDATEPIC",payload:data.url})
        fetch('/updatepic',{
          method:"put",
          headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            pic:data.url
          })
        }).then(res=>res.json())
        .then(result=>{
          console.log(result);
          localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
          dispatch({type:"UPDATEPIC",payload:result.pic})
        })
        // window.location.reload()
      })
      .catch(err => {
        console.log(err);
      });
      }

  },[photo])

  const deletepost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = mypics.filter(item => {
          return item._id !== result._id
        })
        M.toast({ html: "Post Deleted Successfully", classes: "red darken-1" });
        setMypics(newData)
      })
  }

  const updatePhoto = (file) => {

    setPhoto(file)
    
  }




  // const handleFollow = (userIdToFollow) => {
  //   // Make an API request to follow the user with userIdToFollow
  //   fetch(`/follow/${userIdToFollow}`, {
  //     method: "put",
  //     headers: {
  //       'Authorization': "Bearer " + localStorage.getItem("jwt")
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       // Assuming the API returns updated followers and following counts
  //       const { followers, following } = result;
  //       // Update the state with the new counts
  //       dispatch({ type: 'UPDATE_FOLLOWERS_FOLLOWING', payload: { followers, following } });
  //       M.toast({ html: "You are now following this user", classes: "green darken-1" });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       M.toast({ html: "Error following the user", classes: "red darken-1" });
  //     });
  // }

  return (
    <div>

      <div style={{
        display: 'flex',
        flexDirection: 'row', // Stack elements in portrait view
        alignItems: 'center', // Center content horizontally
        margin: "50px 0px",
        padding: '0 20px', // Add padding for smaller screens
      }}>
         <div className="image-container">
          <img
            src={state && state.pic ? state.pic : (state && state.updatedUser ? state.updatedUser.pic : "")}
            alt=""
            className="image"
          />
          <div className="transparent editbutton">
            <span style={{ color: 'black', backgroundColor: 'transparent'}}>
              <i class="material-icons">edit</i>
            </span>
            <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} style={{ width: '250%' }} />
          </div>
        </div>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <h5>{state && state.username ? state.username : (state && state.updatedUser ? state.updatedUser.username : 0)}</h5>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h6>{mypics?.length} Posts</h6>
            <h6>{state && state.followers ? state.followers.length : (state && state.updatedUser ? state.updatedUser.followers.length : 0)} Followers</h6>
            <h6>{state && state.following ? state.following.length : (state && state.updatedUser ? state.updatedUser.following.length : 0)} Following</h6>
          </div>
        </div>
      </div>
      <br /><br />

      <div className="gallery">
        {
          mypics.map(item => {
            return (
              <div className="row center-card" key={item._id}>
                <div className="col s12">
                  <div className="card">
                    <br />
                    <i className="material-icons deleteicon" onClick={() => deletepost(item._id)}>delete_forver</i>
                    <div className="card-image">
                      <img style={{ width: '100%' }} src={item.photo} alt="" />
                      <span className="card-title locationtitle">{item.location}</span>
                    </div>
                    <div className="card-content inputbox">
                      <h6>{item.brief}</h6>
                      <h6>Local & Transportation : {item.howtoroam}</h6>
                      <h6>Best Time : {item.besttime}</h6>
                      <h6>Nearest Airport : {item.nearairport}</h6>
                      <h6>Nearest Railway : {item.nearrailway}</h6>
                      <h6>Average cost per day : {item.costperday}</h6>
                      {/* <button
                        className="waves-effect waves-light btn-small"
                        onClick={() => handleFollow(item.authorId)}
                      >
                        Follow
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Profile;

