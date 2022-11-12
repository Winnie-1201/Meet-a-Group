import { csrfFetch } from "./csrf";

const GET = "attendence/allAttendees";
const STATUS = "attendence/getStatus";

// action creator: get all members
const get = (attendees) => {
  return {
    type: GET,
    attendees,
  };
};

// const getStatus = (status) => {
//   return {
//     type: STATUS,
//     status,
//   };
// };

// thunk: get all attendees by eventId
export const getAllAttendees = (eventId) => async (dispatch) => {
  const response = await fetch(`/api/events/${eventId}/attendees`);
  const attendees = await response.json();

  console.log("members in get all members thunk", attendees);

  if (response.ok) {
    // const members = await response.json();
    // console.log(members);
    await dispatch(get(attendees.Attendees));
    return attendees.Attendees;
  } else {
    return attendees;
  }
};

// thunk: request attendance for an event specified by id;
export const requestAttendance = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
    method: "POST",
  });
  const attendee = await response.json();
  console.log("new attendee in thunk", attendee);
  if (response.ok) {
    await dispatch(getAllAttendees(eventId));
    return attendee;
  }
};

// thunk: get the stutas of current user in specific group
// export const getStatusThunk = (groupId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/groups/${groupId}/status`);

//   if (response.ok) {
//     const status = await response.json();
//     console.log("status in thunk-------", status);
//     await dispatch(getStatus(status));
//   }
// };

// thunk: change the status for specified group by id;
export const changeStatusThunk = (eventId, updates) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (response.ok) {
    await dispatch(getAllAttendees(eventId));
  }
};

// thunk: delete membership to a group specified by id
export const deleteAttendanceThunk =
  (eventId, memberId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memberId }),
    });

    if (response.ok) {
      await dispatch(getAllAttendees(eventId));
    }
  };

// reducer
// const initialState = { allMembers: {}, singleMember: {} };

const attendeeReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET:
      const allAttendees = {};
      //   console.log(newState);
      console.log(action.attendees, "==============");
      action.attendees.forEach((attendee) => {
        allAttendees[attendee.id] = attendee;
      });
      newState = { ...state, allAttendees: allAttendees };
      return newState;
    // case STATUS:
    //   // const currentState = {};

    //   newState = { ...state, status: action.status };
    //   return newState;
    // case GETONE:
    //   const singleMember = {};
    //   singleMember[action.member.memberId] = action.member;
    //   newState = { ...state, singleMember: singleMember };
    //   return newState;
    default:
      return state;
  }
};

export default attendeeReducer;
