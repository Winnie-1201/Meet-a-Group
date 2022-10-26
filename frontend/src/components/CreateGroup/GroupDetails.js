import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getEventByGroup } from "../../store/event";
import { getGroupById, removeGroup } from "../../store/group";
import "./GroupDetails.css";

const GroupDetails = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showAbout, setAbout] = useState(true);
  const [showEvents, setEvents] = useState(false);

  const group = Object.values(
    useSelector((state) => state.group.singleGroup)
  )[0];
  // console.log(
  //   "the group in groupdetails in GroupDetails component====================",
  //   group
  // );

  useEffect(() => {
    dispatch(getEventByGroup(groupId));
    dispatch(getGroupById(groupId));
  }, [dispatch]);

  const currentUser = useSelector((state) => state.session.user);

  const events = Object.values(useSelector((state) => state.event.allEvents));
  // console.log(
  //   "here are all the events in GroupDetaisl comp===========",
  //   events
  // );

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(removeGroup(groupId));
    if (deleted) return history.push("/groups/current");
  };
  // if (!group) return null;
  if (!group?.Organizer) return null;
  let isEvent = false;
  if (!events) isEvent = true;

  return (
    <>
      <div className="group-details-body">
        <div className="group-detail-page">
          <div className="top-detail">
            <div className="group-detail-image flex-grow-three">
              <img
                src={`${group.GroupImages[0].url}`}
                className="group-detail-img"
              />
            </div>
            <div className="group-detail flex-grow-two">
              <h1 className="group-detial-name">{group.name}</h1>
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
          </div>
          {/* <p>
          Organizer: {group.Organizer?.lastName}, {group.Organizer?.firstName}
        </p> */}
        </div>
        {/* <div className="group-detail-middle-bar-container"> */}
        <div className="group-detail-middle-bar">
          <div className="group-detail-middle-bar-left">
            <ul className="middle-bar">
              <li>
                <button
                  className="button-about"
                  onClick={() => {
                    setEvents(false);
                    setAbout(true);
                  }}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  className="button-events button-details"
                  onClick={() => {
                    setEvents(true);
                    setAbout(false);
                  }}
                >
                  Events
                </button>
              </li>
              {currentUser && currentUser.id === group.organizerId && (
                <li>
                  {/* <> */}
                  <Link
                    className="edit-group"
                    to={`/groups/current/${groupId}/edit`}
                  >
                    Edit
                  </Link>
                  {/* <button onClick={handleDelete}>Delete</button>
              </> */}
                  {/* <span className="button-members button-details">Members</span> */}
                </li>
              )}
              {currentUser && currentUser.id === group.organizerId && (
                <li>
                  {/* // <> */}
                  {/* <Link to={`/groups/current/${groupId}/edit`}>Edit</Link> */}
                  <button
                    onClick={handleDelete}
                    className="group-detail-delete-button"
                  >
                    Delete
                  </button>
                  {/* </> */}
                </li>
              )}
              {/* <span className="button-photos  button-details">Photots</span> */}
              {/* <li>
                <span className="button-discussion button-details">
                  Discussion
                </span>
              </li>
              <li>
                <span className="button-more button-details">More</span>
              </li> */}
            </ul>
          </div>
          {/* <div className="group-detail-middle-bar-right">
            <span className="button-request">Request to Join</span>
            <span className="button-dots">...</span>
          </div> */}
        </div>

        <div className="group-detail-hidden">
          {showAbout && (
            <div className="group-detail-hidden-about">
              <div className="group-detail-left flex-grow-one">
                <div className="group-detail-about">
                  <h2>
                    <span>What we're about</span>
                  </h2>
                  <div>
                    <p>{group?.about}</p>
                  </div>
                </div>
              </div>
              <div className="group-detail-right flex-grow-two">
                <h3 className="group-detail-organizer">Organizer</h3>
                <p className="organizer-first-name">
                  {group?.Organizer.firstName}
                </p>
              </div>
            </div>
          )}

          {showEvents && (
            <div className="group-detail-hidden-events">
              {/* <div className="hidden-events-left"> */}
              <div className="hidden-events-top">
                <h3>Incoming events:</h3>
                <div className="hidden-events-link">
                  {currentUser && currentUser.id === group.organizerId && (
                    <Link
                      className="hidden-events-link-text"
                      to={`/events/group/${group.id}/new`}
                    >
                      Create new event
                    </Link>
                  )}
                </div>
              </div>
              <div className="all-events-group-detail">
                {events?.map((event) => (
                  <div key={event.id} className="event-detail-group-detail">
                    {/* <Link to={`/events/${event.id}`}> */}
                    <div className="events-show">
                      <div className="events-show-pics">
                        <img src={event?.previewImage} />
                      </div>
                      <div className="events-show-details">
                        <h2>{event.name}</h2>
                        <p className="event-city">{event.Venue?.city}</p>
                        <div className="events-details-link">
                          click
                          <Link
                            className="events-details-link-text"
                            to={`/events/${event.id}`}
                          >
                            {" "}
                            here{" "}
                          </Link>
                          to see more details
                        </div>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>
                ))}
              </div>

              {showEvents && events.length === 0 && (
                <>
                  <p>There is no event in this group yet</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupDetails;
