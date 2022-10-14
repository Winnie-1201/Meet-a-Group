import { csrfFetch } from "./csrf";

const LOAD = "user/loadSession";
const REMOVE = "user/removeSession";
// const RESTORE = "user/restoreSession"

// regular action creator returning the current user information
const load = (user) => {
  return {
    type: LOAD,
    user,
  };
};

const remove = () => {
  return {
    type: REMOVE,
  };
};

// const restore = (user) => {
//     return {
//         type: RESTORE,
//         user
//     }
// }

// thunk action for login;
export const loginSession = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(load(user));
    return response;
  }
};

// thunk action for restoring current user session;
export const restoreUser = () => async (dispatch) => {
  const response = await fetch("/api/session");

  if (response.ok) {
    const user = await response.json();
    dispatch(load(user));
    return response;
  }
};

// define the initial state
const initialState = { user: null };

// define the session reducer;
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      newState.user = action.user;
      return newState;
    case REMOVE:
      //   newState = { user: null };
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
