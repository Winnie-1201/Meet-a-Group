import { csrfFetch } from "./csrf";

const CREATE_IMG = "groups/createImage";
const REMOVE_IMG = "groups/removeImage";

const createImgage = (image, groupId) => {
  return {
    type: CREATE_IMG,
    image,
    groupId,
  };
};

const removeImg = (imgId) => {
  return {
    type: REMOVE_IMG,
    imgId,
  };
};

export const createImg = (image, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  });

  if (response.ok) {
    const img = await response.json();
    console.log("create image thunk", img);
    dispatch(createImgage(img, groupId));
    return img;
  }
};

export const removeImgThunk = (imgId) => async (dispatch) => {
  const response = await csrfFetch(`/api/group-images/${imgId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeImg(imgId));
    return imgId;
  }
};

// defined the initial state
const initialState = {};

const imagesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_IMG:
      newState = { ...state };
      newState[action.groupId] = action.image;
      return newState;
    case REMOVE_IMG:
      newState = { ...state };
      delete newState[action.imgId];
      return newState;
    default:
      return state;
  }
};

export default imagesReducer;
