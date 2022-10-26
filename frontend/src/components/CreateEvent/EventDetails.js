import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getEventById, deleteEvent } from "../../store/event";
import { getGroupById, getGroupByUserThunk } from "../../store/group";
import "./EventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.session.user);
  const event = Object.values(
    useSelector((state) => state.event.singleEvent)
  )[0];

  // console.log("event details in EventDetails component=========", event);

  const group = Object.values(
    useSelector((state) => state.group.singleGroup)
  )[0];

  // console.log("groups details in EventDetails component=========", groups);

  const helpDelay = async (eventId) => {
    await dispatch(getEventById(eventId));
  };
  useEffect(() => {
    helpDelay(eventId);
    // dispatch(getGroupByUserThunk());
  }, [dispatch]);

  // console.log("event----", event);
  useEffect(() => {
    dispatch(getGroupById(event?.groupId));
    // add event to re-render
  }, [dispatch, event]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(deleteEvent(eventId));
    if (deleted) return history.push(`/groups/current`);
  };

  if (!event) return null;
  // if (!event.EventImages) return null;
  if (!group) return null;

  // console.log("event group id in eventdetails", event.groupId);

  // const group = Object.values(groups)[0];

  // console.log("allgroups---", group);

  const newStartDate = new Date(event.startDate);
  const newEndDate = new Date(event.endDate);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      {/* <p>here is the event detail</p> */}
      <div className="event-details-flex">
        <div className="event-details-flex-grow"></div>
        <div className="event-details-top">
          <div className="event-details-top-title">
            <h1>{event.name}</h1>
            {currentUser &&
              group &&
              event.groupId === group.id &&
              currentUser.id === group.organizerId && (
                <div className="top-title-edit-delete">
                  <Link className="edit-link" to={`/events/${eventId}/edit/`}>
                    Edit
                  </Link>

                  <button
                    className="top-title-delete-button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        </div>

        <div className="event-details-middle-flex">
          <div className="event-details-middle-details">
            <div className="event-detail-flex">
              <div className="event-detail-left-flex">
                <div className="event-detail-img">
                  <img src={`${event.EventImages[0].url}`} />
                </div>
                <div className="event-detail-text">
                  <div className="event-detail-text-top-flex">
                    <h2>Detail</h2>
                  </div>
                  <div className="event-detail-text-bottom">
                    <p>{event.description}</p>
                  </div>
                </div>
                <div className="event-detail-attendees">
                  <div className="event-detail-attendees-title-flex">
                    <h2>Attendees ({event.numAttending})</h2>
                  </div>
                  {/* <div className="event-detail-attendees-card">
                    <div className="card-detail-grid">
                      attendees-detail-later
                    </div>
                  </div> */}
                </div>
                <div className="event-detail-photos">
                  <div className="event-detail-photos-title-flex">
                    <h2>Photos ({event.EventImages.length})</h2>
                  </div>
                  <div className="event-detail-photos-grid">
                    {event.EventImages.map((img) => (
                      <img key={img.id} src={img.url} />
                    ))}
                    {event.EventImages.length === 2 && (
                      <div className="sample-photo-flex">
                        <i className="fa-solid fa-camera" />
                      </div>
                    )}
                    {event.EventImages.length === 1 && (
                      <>
                        <div className="sample-photo-flex">
                          <i className="fa-solid fa-camera" />
                        </div>
                        <div className="sample-photo-flex">
                          <i className="fa-solid fa-camera" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="event-detail-right">
                <div className="event-detail-right-sticky">
                  <div className="right-group-info">
                    <Link
                      to={`/groups/${group?.id}`}
                      className="group-info-link"
                    >
                      <div className="group-info-link-flex">
                        <div className="group-info-img">
                          <img src={group.GroupImages[0].url} />
                        </div>
                        <div className="group-info-text">
                          <div className="group-info-title">{group.name}</div>
                          <div className="group-info-privacy-flex">
                            <span>
                              {group.private === true ? "Private" : "Public"}{" "}
                              group
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="right-event-info">
                    <div className="right-event-info-bottom">
                      <div className="event-info-bottom-one-flex">
                        <i className="fa-regular fa-clock" />
                        <div className="event-info-time">
                          <div>
                            {days[newStartDate.getDay()]},{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                            }).format(newStartDate)}{" "}
                            {newStartDate.getDate()},
                            {newStartDate.getFullYear()} at{" "}
                            {newStartDate.getHours()} :{" "}
                            {newStartDate.getMinutes()}
                            {newStartDate.getMinutes() == 0 ? 0 : ""}{" "}
                            {newStartDate.getHours() >= 12 ? "PM" : "AM"} to
                          </div>
                          <div>
                            {days[newEndDate.getDay()]},{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                            }).format(newEndDate)}{" "}
                            {newEndDate.getDate()},{newEndDate.getFullYear()} at{" "}
                            {newEndDate.getHours()} : {newEndDate.getMinutes()}
                            {newStartDate.getMinutes() == 0 ? 0 : ""}{" "}
                            {newEndDate.getHours() >= 12 ? "PM" : "AM"}
                          </div>
                        </div>
                      </div>

                      <div className="event-info-bottom-two-flex">
                        <i className="fa-solid fa-video" />
                        <div className="event-info-type">
                          <p>{event.type} event</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="event-details-bottom-sticky">
          <div className="event-details-bottom-text">
            <div className="buttom-text-flex">
              <div className="text-event-time">
                {/* <time>{event.startDate}</time> */}
                <div>
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                  })
                    .format(newStartDate)
                    .toUpperCase()}
                  ,{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                  })
                    .format(newStartDate)
                    .toUpperCase()}{" "}
                  · {newStartDate.getHours()} : {newStartDate.getMinutes()}
                  {newStartDate.getMinutes() == 0 ? 0 : ""}{" "}
                  {newStartDate.getHours() >= 12 ? "PM" : "AM"}
                </div>
              </div>
              <div className="text-event-title">
                <p>
                  {event.Venue.city}, {event.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
