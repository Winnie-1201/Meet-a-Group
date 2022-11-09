import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/search";
import { getEvents, getSearchEvents } from "../../store/event";
// import groupsReducer from "../../store/group";
import "./events.css";

const Events = () => {
  const dispatch = useDispatch();
  // listening and make the changes
  const events = Object.values(useSelector((state) => state.event.allEvents));
  // console.log("all the events in Events component===========", events);

  const { keywords, location } = useSearch();

  // console.log("---keywords----search", keywords, location, searchSubmit);
  useEffect(() => {
    // get the data
    // dispatch(getEvents());
    dispatch(getSearchEvents(keywords, location));
  }, [dispatch]);

  if (!events) return null;

  return (
    <>
      <div className="all-events-body">
        <div className="all-events">
          {events.map((event) => (
            <div className="one-event" key={event.id}>
              <Link to={`/events/${event.id}`} className="one-event-link">
                <div className="event-image">
                  <img src={event.previewImage} className="event-img" />
                  <div className="event-type">
                    <div className="event-type-icon">
                      <i className="fa-solid fa-video" />
                    </div>
                    <span>{event.type} Event</span>
                  </div>
                </div>
                <div className="one-event-detail">
                  <p className="event-date">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "short",
                    })
                      .format(new Date(event.startDate))
                      .toUpperCase()}
                    ,{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                    })
                      .format(new Date(event.startDate))
                      .toUpperCase()}{" "}
                    · {new Date(event.startDate).getHours()} :{" "}
                    {new Date(event.startDate).getMinutes()}
                    {new Date(event.startDate).getMinutes() == 0 ? 0 : ""}{" "}
                    {new Date(event.startDate).getHours() >= 12 ? "PM" : "AM"}
                    {/* {event.startDate} */}
                  </p>
                  <p className="event-name">{event.name}</p>
                  <p className="event-group">{event.Group.name}</p>
                  {/* <p className="event-location">
                    {event.Group.city}, {event.Group.state}
                  </p> */}
                  <p className="event-attendees">
                    {event.numAttending} attendees
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
