import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getEvents } from "../../store/event";
import groupsReducer from "../../store/group";
import "./events.css";

const Events = () => {
  const dispatch = useDispatch();
  const events = Object.values(useSelector((state) => state.event));
  console.log("all the events in Events component===========", events);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  if (!events) return null;

  return (
    <>
      {/* <div className="event-groups-content">
        <div className="events-groups">
          <NavLink to="/events" className="event-link">
            Events
          </NavLink>
          <NavLink to="/groups" className="group-link">
            Groups
          </NavLink>
        </div>
      </div> */}
      <div className="all-events">
        {/* <h2>All events</h2> */}

        {events.map((event) => (
          <div className="one-event" key={event.id}>
            <Link to={`/events/${event.id}`} className="one-event-link">
              <div className="event-image">
                <img src={event.previewImage} className="event-img" />
              </div>
              <div className="one-event-detail">
                <p className="event-date">{event.startDate}</p>
                <p className="event-name">{event.name}</p>
                <p className="event-group">{event.Group.name}</p>
                <p className="event-location">
                  {event.Group.city}, {event.Group.state}
                </p>
                <p className="event-attendees">
                  {event.numAttending} attendees
                </p>
                <p className="event-type">{event.type} Event</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Events;
