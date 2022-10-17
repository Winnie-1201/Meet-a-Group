import { csrfFetch } from "./csrf";

const LOAD = "groups/getGroups";
const CREATE = "groups/createGroup";
const CREATE_IMG = "groups/createImage";
const REMOVE = "groups/removeGroup";
const EDIT = "groups/editGroup";

// the action creator for loading groups
const load = (groups) => {
  return {
    type: LOAD,
    groups,
  };
};

const create = (group) => {
  return {
    type: CREATE,
    group,
  };
};

const remove = (groupId) => {
  return {
    type: REMOVE,
    groupId,
  };
};

const edit = (group) => {
  return {
    type: EDIT,
    group,
  };
};

// the action creator for creating a new gorup;

// thunk action creator for loading all groups;
export const getGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");
  if (response.ok) {
    const groups = await response.json();
    console.log("groups in thunk", groups.Groups);
    dispatch(load(groups.Groups));
    return groups;
  }
};

// thunk action creator for creating a group;
export const createGroup = (group) => async (dispatch) => {
  const newGroup = await csrfFetch("/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });

  // const newImg = await csrfFetch(`/groups/${group.id}/images`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(image),
  // });

  if (newGroup.ok) {
    const groupData = await newGroup.json();
    // const imgData = await newImg.json()
    console.log("create group thunk!!", groupData);
    // console.log("create image thunk", imgData);
    // groupData.
    dispatch(create(groupData));

    return groupData;
  }
};

//Edit a group action thunk;
export const editGroupThunk = (group) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${group.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(edit(data));
    return data;
  }
};

// Delete a group aciton thunk;
export const removeGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // const { id: deletedItemId } = await response.json();
    const data = await response.json();
    // console.log("this is deleting in thunk:", response.ok);
    // console.log("this is the return value from delete thunk", data);
    dispatch(remove(groupId));

    return data;
  }
};

// thunk action creator for loading current user's group
// export const getCurrGroups = () => async (dispatch) => {
//   const response = await csrfFetch("/api/groups/current");
//   if (response.ok) {
//     const groups = await response.json();
//     console.log("groups of current user in thunk", groups);
//     dispatch(load(groups.Groups));
//     return groups;
//   }
// };

// defined the initial state
const initialState = {};

// groups reducer
const groupsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      //   const allGroups = {};
      newState = { ...state };
      // console.log(action.groups);

      action.groups.forEach((group) => {
        // console.log(group);
        newState[group.id] = group;
      });
      // const allGroups = action.groups;
      //   action.groups.forEach((group) => {
      //     allGroups[group.organizerId] = group;
      //   });
      // console.log("grouppppp", { ...state, ...allGroups });
      //   return { ...state, ...allGroups };
      // return { ...state, ...allGroups };
      console.log("LOAD: new state", newState);
      return newState;
    case CREATE:
    case EDIT:
      newState = { ...state };
      // const newGroup = action.group;
      // console.log(newGroup);
      newState[action.group.id] = action.group;

      console.log("CREATE new state", newState);
      return newState;

    // case CREATE_IMG:
    //   newState = { ...state };
    //   newState[action.group.id] = {
    //     ...newState[action.group.id],
    //     ...action.imgage,
    //   };
    //   return newState;
    case REMOVE:
      newState = { ...state };
      delete newState[action.groupId];
      return newState;
    default:
      return state;
  }
};

export default groupsReducer;
