import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getEventByGroup } from "../../store/event";
import { getGroupById, removeGroup } from "../../store/group";
import "./GroupDetails.css";

const GroupDetails = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(groupId);
  const group = Object.values(
    useSelector((state) => state.group.singleGroup)
  )[0];
  console.log(
    "the group in groupdetails in GroupDetails component====================",
    group
  );

  useEffect(() => {
    dispatch(getEventByGroup(groupId));
    dispatch(getGroupById(groupId));
    // return () => dispatch(clear());
  }, [dispatch]);

  // const group = useSelector((state) => state.group)[groupId];
  const currentUser = useSelector((state) => state.session.user);

  const events = Object.values(useSelector((state) => state.event));
  console.log(
    "here are all the events in GroupDetaisl comp===========",
    events
  );

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(removeGroup(groupId));
    if (deleted) return history.push("/groups/current");
  };
  // if (!group) return null;
  if (!group?.Organizer) return null;
  let isEvent = false;
  // if (!events) return null;
  if (!events) isEvent = true;
  return (
    <>
      <div className="group-detail-page">
        <div className="group-detail-image">
          <img
            src={`${group.GroupImages[0].url}`}
            className="group-detail-img"
          />
        </div>
        <div className="group-detail">
          <h2 className="group-detial-name">{group.name}</h2>
          <p className="group-detail-location">
            {group.city}, {group.state}
          </p>
          <p className="group-detail-type">
            {group.numMembers} members{" "}
            {group.private === true ? "Private" : "Public"} group
          </p>
          <p className="group-detail-host">
            Organized by{" "}
            <span className="group-detail-firstname">
              {group.Organizer.firstName} {group.Organizer.lastName[0]}.
            </span>
          </p>
        </div>
        {/* <p>
          Organizer: {group.Organizer?.lastName}, {group.Organizer?.firstName}
        </p> */}
      </div>
      <div className="group-detail-middle-bar">
        <div className="group-detail-middle-bar-left">
          <button className="button-about">About</button>
          <button className="button-events">Events</button>
          <button className="button-members">Members</button>
          <button className="button-photos">Photots</button>
          <button className="button-discussion">Discussion</button>
          <button className="button-more">More</button>
        </div>
        <div className="group-detail-middle-bar-right">
          <button className="button-request">Request to Join</button>
          <button className="button-dots">...</button>
        </div>
      </div>
      <div className="group-detail-middle-bar">
        <p>About: {group?.about}</p>
        {currentUser && currentUser.id === group.organizerId && (
          <>
            <Link to={`/groups/current/${groupId}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
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
