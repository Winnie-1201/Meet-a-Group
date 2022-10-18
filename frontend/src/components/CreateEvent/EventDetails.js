import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getEventById, deleteEvent } from "../../store/event";
import { getGroupById } from "../../store/group";

const EventDetails = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.session.user);
  const event = useSelector((state) => state.event)[eventId];
  //   const groupId = event.groupId;
  //   const group = Object.values(useSelector((state) => state.group))[0];
  console.log("event details in EventDetails component=========", event);
  //   console.log("the groupId", groupId);
  //   console.log("group detail in EventDetails======", group);

  //   const credential = currentUser.id === group.organizerId;

  useEffect(() => {
    dispatch(getEventById(eventId));
    // dispatch(getGroupById(groupId));
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(deleteEvent(eventId));
    if (deleted) return history.push(`/events`);
  };
  if (!event) return null;
  if (!event.EventImages) return null;
  return (
    <>
      {/* <p>here is the event detail</p> */}
      <div>
        <h2>{event.name}</h2>
        <p>Capacity: {event.capacity}</p>
        <p>Description: {event.description}</p>
        <img src={`${event.EventImages[0].url}`} />
      </div>
      {currentUser && (
        <div>
          {/* <button>Edit</button> */}
          <Link to={`/events/${eventId}/edit/`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
          {/* <button onClick={() => dispatch(deleteEvent(eventId))}>Delete</button> */}
        </div>
      )}
    </>
  );
};

export default EventDetails;
