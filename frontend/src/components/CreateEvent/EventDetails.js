import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getAllAttendees, requestAttendance } from "../../store/attendence";
import { getEventById, deleteEvent } from "../../store/event";
import { getGroupById, getGroupByUserThunk } from "../../store/group";
import { getStatusThunk } from "../../store/member";
import "./EventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setLoaded] = useState(false);
  const [isLoaded1, setLoaded1] = useState(false);

  const currentUser = useSelector((state) => state.session.user);
  const event = Object.values(
    useSelector((state) => state.event.singleEvent)
  )[0];

  const group = Object.values(
    useSelector((state) => state.group.singleGroup)
  )[0];

  const status = useSelector((state) => state.member.status);
  let attendees = useSelector((state) => state.attendee.allAttendees);

  useEffect(() => {
    // dispatch(getEventById(eventId))
    dispatch(getAllAttendees(eventId))
      .then(() => dispatch(getEventById(eventId)))
      .then(() => setLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGroupById(event?.groupId))
      .then(() => dispatch(getStatusThunk(event?.groupId)))
      .then(() => setLoaded1(true));

    // add event to re-render
  }, [dispatch, event]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(deleteEvent(eventId));
    if (deleted) return history.push(`/groups/current`);
  };

  const handleAttendEvent = async (e) => {
    e.preventDefault();

    await dispatch(requestAttendance(eventId));
    // await dispatch()
  };

  // if (!event) return null;
  // if (!event.EventImages) return null;
  // if (!group) return null;

  let newStartDate;
  let newEndDate;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (isLoaded) {
    // const newStartDate = new Date(event.startDate);
    // const newEndDate = new Date(event.endDate);
    newStartDate = new Date(event.startDate);
    newEndDate = new Date(event.endDate);
    attendees = Object.values(attendees);
  }

  return (
    isLoaded &&
    isLoaded1 && (
      <>
        {/* <p>here is the event detail</p> */}
        <div className="event-details-flex">
          {/* <div className="event-details-flex-grow"></div> */}
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
                      <h2>Details</h2>
                    </div>
                    <div className="event-detail-text-bottom">
                      <p>{event.description}</p>
                    </div>
                  </div>
                  <div className="event-detail-attendees">
                    <div className="event-detail-attendees-title-flex">
                      <h2>Attendees ({attendees.length})</h2>
                    </div>
                    {/* <div className="event-detail-attendees-card"> */}
                    <div className="card-detail-grid">
                      {attendees.map((attendee) => (
                        <div key={attendee.id} className="card-detail-flex">
                          <div className="card-detail-img">
                            <div className="card-detail-image">
                              {attendee.lastName[0]}
                              {attendee.firstName[0]}
                            </div>
                          </div>
                          <div className="card-detail-name">
                            {attendee.firstName} {attendee.lastName[0]}.
                          </div>
                          <div className="card-detail-status">
                            {attendee.Attendances[0].status === "host"
                              ? "Organizer"
                              : attendee.Attendances[0].status}
                          </div>
                        </div>
                      ))}
                    </div>
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
                              {newEndDate.getDate()},{newEndDate.getFullYear()}{" "}
                              at {newEndDate.getHours()} :{" "}
                              {newEndDate.getMinutes()}
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
            <div className="event-details-bottom-text flex-between">
              <div className="buttom-text-flex">
                <div className="text-event-time">
                  {/* <time>{event.startDate}</time> */}
                  <div className="time-font">
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
                    {newStartDate.getDate()} · {newStartDate.getHours()} :{" "}
                    {newStartDate.getMinutes()}
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
              <div className="bottom-right-flex">
                <div className="price">price</div>
                <button className="attend-button" onClick={handleAttendEvent}>
                  Attend
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default EventDetails;
