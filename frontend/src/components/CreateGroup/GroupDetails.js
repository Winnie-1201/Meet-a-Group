import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getEventByGroup } from "../../store/event";
import { clear, getGroupById, removeGroup } from "../../store/group";

const GroupDetails = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventByGroup(groupId));
    dispatch(getGroupById(groupId));
    return () => dispatch(clear());
  }, [dispatch]);

  // const group = useSelector((state) => state.group)[groupId];
  const currentUser = useSelector((state) => state.session.user);
  const group = useSelector((state) => state.group)[groupId];
  console.log(
    "the group in groupdetails in GroupDetails component====================",
    group
  );

  const events = Object.values(useSelector((state) => state.event));
  console.log(
    "here are all the events in GroupDetaisl comp===========",
    events
  );
  // if (!group) return null;
  if (!group.Organizer) return null;
  let isEvent = false;
  // if (!events) return null;
  if (!events) isEvent = true;
  return (
    <>
      <div>
        <h2>{group.name}</h2>
        <p>
          Organizer: {group.Organizer.lastName}, {group.Organizer.firstName}
        </p>
        <p>About: {group.about}</p>
        <img src={`${group.GroupImages[0].url}`} />
        {currentUser && currentUser.id === group.organizerId && (
          <>
            <Link to={`/groups/current/${groupId}/edit`}>Edit</Link>
            <button onClick={() => dispatch(removeGroup(groupId))}>
              Delete
            </button>
          </>
        )}
      </div>
      <div>
        <h3>Incoming events:</h3>
        {events?.map((event) => (
          <div key={event.id}>
            <Link to={`/events/${event.id}`} className="nav-link">
              <h2>{event.name}</h2>
              <p>{event.Venue?.city}</p>
              <img src={event?.previewImage} />
            </Link>
          </div>
        ))}
        {isEvent && (
          <>
            <p>There is no event in your group yet</p>
            <Link to="/events/new">Create your first event!</Link>
          </>
        )}
        {currentUser && currentUser.id === group.organizerId && (
          <>
            <Link to={`/events/group/${group.id}/new`}>Create new event</Link>
          </>
        )}
      </div>
    </>
  );
};

export default GroupDetails;
