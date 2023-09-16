// export const initialState = null

// export const reducer = (state, action) => {
//     if (action.type === "USER") {
//         return action.payload
//     }
//     if (action.type === "CLEAR") {
//         return null
//     }

//     if (action.type === "UPDATE") {
//         return {
//             ...state,
//             followers:action.payload.followers,
//             following:action.payload.following
//         }
//     }
//     return state
// }

export const initialState = null;

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "CLEAR") {
    return null;
  }

  // You can handle the real-time update directly when receiving new data
  if (action.type === "UPDATE_FOLLOWERS_FOLLOWING") {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following,
    };
  }

  if (action.type === "UPDATEPIC"){
    return{
      ...state,
      pic:action.payload

    }
  }

  return state;
};
