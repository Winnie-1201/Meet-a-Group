import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getEventById, deleteEvent } from "../../store/event";
import { getGroupById, getGroupByUserThunk } from "../../store/group";

const EventDetails = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.session.user);
  // const event = useSelector((state) => state.event)[eventId];
  // const event = Object.values(useSelector((state) => state.event.singleEvent));
  const event = Object.values(
    useSelector((state) => state.event.singleEvent)
  )[0];

  console.log("event details in EventDetails component=========", event);

  //   console.log("the groupId", groupId);
  //   console.log("group detail in EventDetails======", group);

  //   const credential = currentUser.id === group.organizerId;
  // const groupId = event.groupId;
  const groups = useSelector((state) => state.group.allGroups);
  console.log("groups details in EventDetails component=========", groups);
  const helpDelay = async (eventId) => {
    await dispatch(getEventById(eventId));
  };
  useEffect(() => {
    helpDelay(eventId);
    // dispatch(getEventById(eventId));
    dispatch(getGroupByUserThunk());
  }, [dispatch]);

  // if (event) {
  //   const groupId = event.groupId;
  // }

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(deleteEvent(eventId));
    if (deleted) return history.push(`/groups/current`);
  };

  if (!event) return null;
  if (!event.EventImages) return null;
  // console.log("iddd-------", currentUser.id, group.organizerId);
  console.log("event group id in eventdetails", event.groupId);
  const group = Object.values(groups)[0];
  console.log("group in eventdetails", group);
  return (
    <>
      {/* <p>here is the event detail</p> */}
      <div>
        <h2>{event.name}</h2>
        <p>Capacity: {event.capacity}</p>
        <p>Description: {event.description}</p>
        <img src={`${event.EventImages[0].url}`} />
        {/* <img src={`${event.EventImages[0].url}`} /> */}
      </div>
      {currentUser &&
        group &&
        event.groupId === group.id &&
        currentUser.id === group.organizerId && (
          <div>
            <Link to={`/events/${eventId}/edit/`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
    </>
  );
};

export default EventDetails;
