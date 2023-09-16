// import React, { useState, useEffect, useContext } from 'react'
// import {UserContext} from '../../App'


// function Home() {
//   const [data, setData] = useState([])
//   const {state,dispatch} = useContext(UserContext)

//   useEffect(() => {
//     fetch('/allpost', {
//       headers: {
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       }
//     }).then(res => res.json()).then(result => {
//         console.log(result);
//         setData(result.posts)
//     })
//   }, [])

// const likePost = (id)=>{
//   fetch('/like',{
//     method:"put",
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":"Bearer "+localStorage.getItem("jwt")
//     },
//     body:JSON.stringify({
//       postId:id
//     })
//   }).then(res=>res.json())
//   .then(result=>{
//     // console.log(result);
//     const newData = data.map(item=>{
//       if(item._id===result._id){
//         return result
//       }
//       else{
//         return item
//       }
//     })
//     setData(newData)
//   }).catch(err=>{
//     console.log(err);
//   })
// }

// const unlikePost = (id)=>{
//   fetch('/unlike',{
//     method:"put",
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":"Bearer "+localStorage.getItem("jwt")
//     },
//     body:JSON.stringify({
//       postId:id
//     })
//   }).then(res=>res.json()).then(result=>{
//     // console.log(result);
//     const newData = data.map(item=>{
//       if(item._id===result._id){
//         return result
//       }
//       else{
//         return item
//       }
//     })
//     setData(newData)
//   }).catch(err=>{
//     console.log(err);
//   })
// }

// const makeComment = (text,postId)=>{
//   fetch('/comment',{
//     method:"put",
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":"Bearer "+localStorage.getItem("jwt")
//     },
//     body:JSON.stringify({
//       postId,
//       text
//     })
//   }).then(res=>res.json(0))
//   .then(result=>{
//     console.log(result);
//     const newData = data.map(item=>{
//       if(item._id===result._id){
//         return result
//       }
//       else{
//         return item
//       }
//     })
//     setData(newData)
//   }).catch(err=>{
//     console.log(err);
//   })
// }


//   return (
//     <div className="home">
//       {
//         data.map(item => {
//           return (
//             <div className="card home-card" key={item._id}> 
//              <h5>{item.postedBy.username}</h5>
//               <div className="card-image" style={{ position: 'relative' }}>
//                 <img src={item.photo} alt="" />
//                 <span className="card-title locationtitle">{item.location}</span>
//               </div>
//               <br />
//               {item.likes.includes(state._id)

//                   ? <i className="material-icons" onClick={() => unlikePost(item._id)} style={{ fontSize: '35px', color: 'rgb(73, 100, 255) ', backgroundColor: 'transparent'}}>thumb_up<span className='likecount'> {item.likes.length} likes</span> </i>
//                   :  <i className="material-icons" onClick={() => likePost(item._id)} style={{ fontSize: '35px', color: 'rgb(89, 87, 87)', backgroundColor: 'transparent'}}>thumb_up <span className='likecount'> {item.likes.length} likes</span></i>

//               }
//               <div className="card-content cardcontent">
//                 {/* <h6>Location : {item.location}</h6> */}
//                 <h6>{item.brief}</h6>
//                 <h6>Local & Transportation : {item.howtoroam}</h6>
//                 <h6>Best Time : {item.besttime}</h6>
//                 <h6>Nearest Airport : {item.nearairport}</h6>
//                 <h6>Nearest Railway : {item.nearrailway}</h6>
//                 <h6>Avrage cost per day : {item.costperday}</h6>
//               </div>
//               {/* comment tag */}
//               <form onSubmit={(e)=>{
//                 e.preventDefault()
//                 makeComment(e.target[0].value,item._id); 
//               }}>
//                 <input type="text" placeholder="Add a Comment" />
//               </form>


//               <div>
//                 {
//                   item.comments.map(record=>{
//                     return(
//                       <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.username}</span> : {record.text}</h6>
//                     )
//                   })
//                 }
//               </div>

//             </div>

//           )
//         })
//       }
//    </div>
//   )
// }

// export default Home


import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom'

function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false); // Add state for showing comments

  useEffect(() => {
    fetch('/allpost', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId,
        text
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="home">
      {data.slice().reverse().map(item => (
        <div className="card home-card" key={item._id}>
          {/* ... (your existing code for post content) */}

          <div className="user-profile">
      <img
        className="profile-picture"
        src={item.postedBy.pic} // Assuming the user's profile picture URL is available in item.postedBy.profilePic
        alt={`${item.postedBy.username}'s profile`}
      />
      <h5>
        <Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>
          {item.postedBy.username}
        </Link>
      </h5>
    </div>



          {/* <h5>
            <Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>
              {item.postedBy.username}
            </Link>
          </h5> */}
          <div className="card-image" style={{ position: 'relative' }}>
            <img src={item.photo} alt="" />
            <span className="card-title locationtitle">{item.location}</span>
          </div>
          <br />
          {item.likes.includes(state._id)

            ? <i className="material-icons" onClick={() => unlikePost(item._id)} style={{ fontSize: '35px', color: 'rgb(73, 100, 255) ', backgroundColor: 'transparent' }}>thumb_up<span className='likecount'> {item.likes.length} likes</span> </i>
            : <i className="material-icons" onClick={() => likePost(item._id)} style={{ fontSize: '35px', color: 'rgb(89, 87, 87)', backgroundColor: 'transparent' }}>thumb_up <span className='likecount'> {item.likes.length} likes</span></i>

          }
          <div className="card-content cardcontent">
            {/* <h6>Location : {item.location}</h6> */}
            <h6>{item.brief}</h6>
            <h6>Local & Transportation : {item.howtoroam}</h6>
            <h6>Best Time : {item.besttime}</h6>
            <h6>Nearest Airport : {item.nearairport}</h6>
            <h6>Nearest Railway : {item.nearrailway}</h6>
            <h6>Avrage cost per day : {item.costperday}</h6>
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              makeComment(e.target[0].value, item._id);
            }}
          >
            <input type="text" placeholder="Add a Comment" />
          </form>

          {/* Add a button to toggle comments */}
          <div className="center-button">
            <button onClick={toggleComments} className="no-button-style">
              {showComments ? 'Hide Comments' : 'Show All Comments'}
            </button>
          </div>

          {/* Conditionally render comments based on the state */}
          {showComments && (
            <div className="commentdiv">
              {item.comments.map(record => (
                <h6 key={record._id}>
                  <span style={{ fontWeight: '500' }}>{record.postedBy.username}</span> : {record.text}
                </h6>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;






