import { csrfFetch } from "./csrf";
// import { LOAD_EVENTS } from "./event";
import { createImg } from "./image";

const LOAD = "groups/getGroups";
const LOAD_ONE = "groups/getOneGroup";
const CREATE = "groups/createGroup";
const REMOVE = "groups/removeGroup";
const EDIT = "groups/editGroup";

// the action creator for loading groups
const load = (groups) => {
  return {
    type: LOAD,
    groups,
  };
};

// load group by id
const loadOne = (group) => {
  return {
    type: LOAD_ONE,
    group,
  };
};

// create a group
const create = (group) => {
  return {
    type: CREATE,
    group,
  };
};

// remove a group by id
const remove = (groupId) => {
  return {
    type: REMOVE,
    groupId,
  };
};

// edit a group
const edit = (group) => {
  return {
    type: EDIT,
    group,
  };
};

// thunk action creator for loading all groups;
export const getGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");
  if (response.ok) {
    const groups = await response.json();
    // console.log("getting all groups in thunk", groups.Groups);
    dispatch(load(groups.Groups));
    return groups;
  }
};

// thunk: get details of a group from an id:
export const getGroupById = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`);

  if (response.ok) {
    const group = await response.json();
    // console.log("getting group details by id in thunk", group);
    await dispatch(loadOne(group));
    return group;
  }
};

// thunk action creator: get group by userid;
export const getGroupByUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups/current");

  if (response.ok) {
    const groups = await response.json();
    // console.log("getting current user's groups in thunk", groups.Groups);
    await dispatch(load(groups.Groups));
    return groups;
  }
};

// thunk action creator for creating a group;
export const createGroup = (group, image) => async (dispatch) => {
  const response = await csrfFetch("/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });

  if (response.ok) {
    const groupData = await response.json();
    const groupId = groupData.id;
    // console.log("creating a new group thunk!!", groupData);
    dispatch(create(group));
    // console.log("adding the img to the new created group in thunk", image);
    dispatch(createImg(image, groupId));
    return groupData;
  }
};

//Edit a group action thunk;
export const editGroupThunk = (group, groupId) => async (dispatch) => {
  // console.log("in edit gorup thunk", group, groupId);
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });

  // console.log("the response in edit gorup thunk", response);
  if (response.ok) {
    const data = await response.json();
    // console.log("editing group in thunk", data);
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
    const data = await response.json();
    // console.log("deleting group by id in thunk", data);
    dispatch(remove(groupId));
    return data;
  }
};

// defined the initial state
const initialState = { allGroups: {}, singleGroup: {} };

// groups reducer
const groupsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = { allGroups: {}, singleGroup: {} };
      const allGroups = {};
      action.groups.forEach((group) => {
        allGroups[group.id] = group;
      });
      newState.allGroups = allGroups;
      // console.log("LOAD: new state in reducer", newState);
      return newState;
    case LOAD_ONE:
      newState = { allGroups: {}, singleGroup: {} };
      const singleGroup = {};
      singleGroup[action.group.id] = action.group;
      newState.singleGroup = singleGroup;
      // console.log("loading one group: new state in reducer", newState);
      return newState;
    case CREATE:
      newState = { allGroups: {}, singleGroup: {} };
      newState.singleGroup[action.group.id] = action.group;
      // console.log("CREATE new state in reducer", newState);
      return newState;
    case EDIT:
      newState = { ...state };
      // console.log("new state in edit reducer", newState);
      newState.singleGroup = action.group;
      // console.log("editing new state in reducer", newState);
      return newState;
    case REMOVE:
      newState = { ...state };
      delete newState.singleGroup[action.groupId];
      // console.log("removing new state in reducer", newState);
      return newState;
    default:
      return state;
  }
};

export default groupsReducer;
