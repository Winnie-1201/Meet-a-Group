import { csrfFetch } from "./csrf";

const GET = "member/allMembers";
const GETONE = "member/oneMember";

// action creator: get all members
const get = (members) => {
  return {
    type: GET,
    members,
  };
};

const getOne = (member) => {
  return {
    type: GETONE,
    member,
  };
};

// thunk: get all members by groupId
export const getAllMembers = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}/members`);
  const members = await response.json();

  console.log("members in get all members thunk", members);

  if (response.ok) {
    // const members = await response.json();
    // console.log(members);
    await dispatch(get(members.Members));
    return members.Members;
  } else {
    return members;
  }
};

// thunk: request to join a group with groupId and login;
export const requestMembership = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
    method: "POST",
  });
  const member = await response.json();
  console.log("new member in thunk", member);
  if (response.ok) {
    await dispatch(getOne(member));
    return member;
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
    case GETONE:
      const singleMember = {};
      singleMember[action.member.memberId] = action.member;
      newState = { ...state, singleMember: singleMember };
      return newState;
    default:
      return state;
  }
};

export default memberReducer;
