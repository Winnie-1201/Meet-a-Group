const LOAD = "groups/getGroups";

// the action creator for loading groups
const load = (groups) => {
  return {
    type: LOAD,
    groups,
  };
};

// thunk action creator for loading all groups;
export const getGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");
  if (response.ok) {
    const groups = await response.json();
    console.log("groups in thunk", groups);
    dispatch(load(groups));
    return response;
  }
};

// defined the initial state
const initialState = {};

// groups reducer
const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      //   const allGroups = {};
      const allGroups = action.groups;
      //   action.groups.forEach((group) => {
      //     allGroups[group.organizerId] = group;
      //   });
      console.log("grouppppp", { ...state, ...allGroups });
      //   return { ...state, ...allGroups };
      return { ...state, ...allGroups };
    default:
      return state;
  }
};

export default groupsReducer;
