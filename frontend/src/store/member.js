import { csrfFetch } from "./csrf";

const GET = "member/allMembers";

// action creator: get all members
const get = (members) => {
  return {
    type: GET,
    members,
  };
};

// thunk: get all members by groupId
export const getAllMembers = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}/members`);
  const members = await response.json();

  if (response.ok) {
    // const members = await response.json();
    // console.log(members);
    await dispatch(get(members.Members));
    return members.Members;
  } else {
    return members;
  }
};

// reducer
// const initialState = { allMembers: {}, singleMember: {} };

const memberReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET:
      const allMembers = {};
      //   console.log(newState);
      console.log(action.members, "==============");
      action.members.forEach((member) => {
        allMembers[member.id] = member;
      });
      newState = { ...state, allMembers: allMembers };
      return newState;
    default:
      return state;
  }
};

export default memberReducer;
