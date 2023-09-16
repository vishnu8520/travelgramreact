// import React, { useEffect, useState, useContext } from 'react';
// import { UserContext } from '../../App'
// import { useParams } from 'react-router-dom'

// function Profile() {
//   const [userProfile, setProfile] = useState([])
//   const { state, dispatch } = useContext(UserContext)
//   const { userid } = useParams()
//   console.log(userid);

//   useEffect(() => {
//     fetch(`/user/${userid}`, {
//       headers: {
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       }
//     }).then(res => res.json())
//       .then(result => {
//         console.log(result);
//         setProfile(result)
//       })
//   }, [])

//   const followUser = () =>{
//     fetch('/follow',{
//       method:"put",
//       headers:{
//         "Content-Type": "application/json",
//         "Authorization": "Bearer "+localStorage.getItem("jwt")
//       },
//       body:JSON.stringify({
//         followId:userid
//       })
//     }).then(res=>res.json())
//     .then(data=>{
//       console.log(data);
//       dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
//       localStorage.setItem("user", JSON.stringify(data))
      
//     })
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
//             src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
//             alt=""
//             className="image"
//           />
//         </div>
//         <div style={{ textAlign: 'center', width: '100%' }}>
//           <h5>{userProfile.user?.username}</h5>
//           <h6>{userProfile.user?.email}</h6>
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <h6>{userProfile.posts?.length} Posts</h6>
//             <h6>{userProfile.user?.followers?.length} Followers</h6>
//             <h6>{userProfile.user?.following?.length} Following</h6>
//             <br />
//           </div>
//           <button onClick={()=>followUser()} className="btn waves-effect blue darken-2">Follow</button>

//         </div>
//       </div>

//       <div className="div">
//         <div className="containerup">
//           <div className="columnup">
//             {
//               userProfile.posts?.map(item => {
//                 return (


//                   <div className="row center-card">
//                     <div className="col s12">
//                       <div className="card">
//                         <div className="card-image">
//                           <img key={item._id} style={{ width: '100%' }} src={item.photo} alt="" />
//                           <span className="card-title locationtitle">{item.location}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                 )
//               })
//             }
//           </div>
//         </div>
//       </div>


//     </div>

//   )
// }

// export default Profile;


// import React, { useEffect, useState, useContext } from 'react';
// import { UserContext } from '../../App'
// import { useParams } from 'react-router-dom'

// function Profile() {
//   const [userProfile, setProfile] = useState([]);
//   const { state, dispatch } = useContext(UserContext);
//   const { userid } = useParams();
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followerCount, setFollowerCount] = useState(0);

//   useEffect(() => {
//     fetch(`/user/${userid}`, {
//       headers: {
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       }
//     }).then(res => res.json())
//       .then(result => {
//         console.log(result);
//         setProfile(result);
//         setFollowerCount(result.user?.followers?.length || 0);
//         // Check if the logged-in user is already following the profile user
//         setIsFollowing(result.user?.followers?.includes(state._id) || false);
//       });
//   }, [state._id, userid]);

//   const followUser = () => {
//     fetch('/follow', {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({
//         followId: userid
//       })
//     }).then(res => res.json())
//       .then(data => {
//         console.log(data);
//         dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
//         localStorage.setItem("user", JSON.stringify(data));
//         setIsFollowing(true); // Update the following state
//         setFollowerCount(prevCount => prevCount + 1); // Update the follower count
//       });
//   }

//   const unfollowUser = () => {
//     fetch('/unfollow', {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({
//         unfollowId: userid
//       })
//     }).then(res => res.json())
//       .then(data => {
//         console.log(data);
//         dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
//         localStorage.setItem("user", JSON.stringify(data));
//         setIsFollowing(false); // Update the following state
//         setFollowerCount(prevCount => prevCount - 1); // Update the follower count
//       });
//   }

//   return (
//     <div>
//       <div style={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         margin: "50px 0px",
//         padding: '0 20px',
//       }}>
//         <div className="image-container">
//         <img
//             src={userProfile.user?.pic }
//             alt=""
//             className="image"
//           />
//         </div>
//         <div style={{ textAlign: 'center', width: '100%' }}>
//           <h5>{userProfile.user?.username}</h5>
//           <h6>{userProfile.user?.email}</h6>
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <h6>{userProfile.posts?.length} Posts</h6>
//             <h6>{followerCount} Followers</h6> {/* Updated follower count */}
//             <h6>{userProfile.user?.following?.length} Following</h6>
//             <br />
//           </div>
//           {isFollowing ? (
//             <button onClick={unfollowUser} className="btn waves-effect red darken-2">Unfollow</button>
//           ) : (
//             <button onClick={followUser} className="btn waves-effect blue darken-2">Follow</button>
//           )}
//         </div>
//       </div>

//       <div className="div">
//         <div className="containerup">
//           <div className="columnup">
//             {
//               userProfile.posts?.map(item => {
//                 return (
//                   <div className="row center-card" key={item._id}>
//                     <div className="col s12">
//                       <div className="card">
//                         <div className="card-image">
//                           <img style={{ width: '100%' }} src={item.photo} alt="" />
//                           <span className="card-title locationtitle">{item.location}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </div>
//       </div>
      
//       {/* Continue with the rest of your profile component code */}
//     </div>
//   )
// }

// export default Profile;


// import React, { useEffect, useState, useContext } from 'react';
// import { UserContext } from '../../App';
// import { useParams } from 'react-router-dom';

// function Profile() {
//   const [userProfile, setProfile] = useState([]);
//   const { state, dispatch } = useContext(UserContext);
//   const { userid } = useParams();
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followerCount, setFollowerCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true); // Add a loading state

//   // Function to fetch user profile and check follow status
//   const fetchUserProfileAndFollowStatus = () => {
//     fetch(`/user/${userid}`, {
//       headers: {
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       }
//     })
//       .then(res => res.json())
//       .then(result => {
//         console.log(result);
//         setProfile(result);
//         setFollowerCount(result.user?.followers?.length || 0);
//         // Check if the logged-in user is already following the profile user
//         setIsFollowing(result.user?.followers?.includes(state?._id) || false);
//         setIsLoading(false); // Set loading to false when data is available
//       })
//       .catch(error => {
//         setIsLoading(false); // Handle errors by setting loading to false
//         console.error(error);
//       });
//   };

//   // Fetch user profile and follow status when component mounts
//   useEffect(() => {
//     fetchUserProfileAndFollowStatus();
//   }, [state?._id, userid]);

//   const followUser = () => {
//     fetch('/follow', {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({
//         followId: userid
//       })
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//         // Update the follow status in the component state
//         setIsFollowing(true);
//         // Update the follower count in the component state
//         setFollowerCount(prevCount => prevCount + 1);
//         // Store the updated follow information in a more persistent storage (e.g., server or localStorage)
//         // ... Update follow information on the server or localStorage ...
//       });
//   };

//   const unfollowUser = () => {
//     fetch('/unfollow', {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({
//         unfollowId: userid
//       })
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//         // Update the follow status in the component state
//         setIsFollowing(false);
//         // Update the follower count in the component state
//         setFollowerCount(prevCount => prevCount - 1);
//         // Store the updated follow information in a more persistent storage (e.g., server or localStorage)
//         // ... Update follow information on the server or localStorage ...
//       });
//   };

//   // Render follow/unfollow button based on the follow status
//   const renderFollowButton = () => {
//     if (isLoading) {
//       // You can show a loading indicator here while data is being fetched
//       return <p>Loading...</p>;
//     }
    
//     if (isFollowing) {
//       return (
//         <button onClick={unfollowUser} className="btn waves-effect red darken-2">Unfollow</button>
//       );
//     } else {
//       return (
//         <button onClick={followUser} className="btn waves-effect blue darken-2">Follow</button>
//       );
//     }
//   };

//   return (
// <div>
//       <div style={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         margin: "50px 0px",
//         padding: '0 20px',
//       }}>
//         <div className="image-container">
//         <img
//             src={userProfile.user?.pic }
//             alt=""
//             className="image"
//           />
//         </div>
//         <div style={{ textAlign: 'center', width: '100%' }}>
//           <h5>{userProfile.user?.username}</h5>
//           <h6>{userProfile.user?.email}</h6>
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <h6>{userProfile.posts?.length} Posts</h6>
//             <h6>{followerCount} Followers</h6> {/* Updated follower count */}
//             <h6>{userProfile.user?.following?.length} Following</h6>
//             <br />
//           </div>
//           {isFollowing ? (
//             <button onClick={unfollowUser} className="btn waves-effect red darken-2">Unfollow</button>
//           ) : (
//             <button onClick={followUser} className="btn waves-effect blue darken-2">Follow</button>
//           )}
//         </div>
//       </div>

//       <div className="div">
//         <div className="containerup">
//           <div className="columnup">
//             {
//               userProfile.posts?.map(item => {
//                 return (
//                   <div className="row center-card" key={item._id}>
//                     <div className="col s12">
//                       <div className="card">
//                         <div className="card-image">
//                           <img style={{ width: '100%' }} src={item.photo} alt="" />
//                           <span className="card-title locationtitle">{item.location}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </div>
//       </div>
      
//       {/* Continue with the rest of your profile component code */}
//     </div>
//   );
// }

// export default Profile;


import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

function Profile() {
  const [userProfile, setProfile] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch user profile and check follow status
  const fetchUserProfileAndFollowStatus = () => {
    fetch(`/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setProfile(result);
        setFollowerCount(result.user?.followers?.length || 0);
        setIsFollowing(result.user?.followers?.includes(state?._id) || false);

        // Check follow status in localStorage and update state accordingly
        const followStatusInStorage = localStorage.getItem(`followStatus_${userid}`);
        if (followStatusInStorage !== null) {
          setIsFollowing(JSON.parse(followStatusInStorage));
        }

        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  // Fetch user profile and follow status when component mounts
  useEffect(() => {
    fetchUserProfileAndFollowStatus();
  }, [state?._id, userid]);

  const followUser = () => {
    fetch('/follow', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userid
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsFollowing(true);
        setFollowerCount(prevCount => prevCount + 1);

        // Store the follow status in localStorage
        localStorage.setItem(`followStatus_${userid}`, JSON.stringify(true));

        // ... Update follow information on the server or localStorage ...
      });
  };

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        unfollowId: userid
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsFollowing(false);
        setFollowerCount(prevCount => prevCount - 1);

        // Store the follow status in localStorage
        localStorage.setItem(`followStatus_${userid}`, JSON.stringify(false));

        // ... Update follow information on the server or localStorage ...
      });
  };

  // Render follow/unfollow button based on the follow status
  const renderFollowButton = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (isFollowing) {
      return (
        <button onClick={unfollowUser} className="btn waves-effect red darken-2">Unfollow</button>
      );
    } else {
      return (
        <button onClick={followUser} className="btn waves-effect blue darken-2">Follow</button>
      );
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: "50px 0px",
        padding: '0 20px',
      }}>
        <div className="image-container">
          <img
            src={userProfile.user?.pic}
            alt=""
            className="image"
          />
        </div>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <h5>{userProfile.user?.username}</h5>
          <h6>{userProfile.user?.email}</h6>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h6>{userProfile.posts?.length} Posts</h6>
            <h6>{followerCount} Followers</h6>
            <h6>{userProfile.user?.following?.length} Following</h6>
            <br />
          </div>
          {renderFollowButton()}
        </div>
      </div>

      <div className="div">
        <div className="containerup">
          <div className="columnup">
            {userProfile.posts?.map(item => {
              return (
                <div className="row center-card" key={item._id}>
                  <div className="col s12">
                    <div className="card">
                      <div className="card-image">
                        <img style={{ width: '100%' }} src={item.photo} alt="" />
                        <span className="card-title locationtitle">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;