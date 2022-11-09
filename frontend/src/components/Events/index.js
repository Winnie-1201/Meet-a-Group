import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useSearch } from "../../context/search";
import { getEvents, getSearchEvents } from "../../store/event";
import "./events.css";

const Events = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const events = Object.values(useSelector((state) => state.event.allEvents));

  const keywords = localStorage.getItem("keywords");
  const location = localStorage.getItem("location");

  const { setKeywords, setLocation } = useSearch();

  useEffect(() => {
    // dispatch(getGroups());
    dispatch(getSearchEvents(keywords, location));
  }, [dispatch]);

  const handleReset = async (e) => {
    e.preventDefault();

    // localStorage.setItem("keywords", "");
    // localStorage.setItem("location", "");
    // setKeywords("");
    // setLocation("");

    // const reset = await dispatch(getEvents());
    // if (reset) history.push("/events");
    history.push("/groups");
  };

  return (
    <>
      <div className="event-groups-body">
        <div className="event-groups-content">
          <div className="events-groups">
            <h2 className="event-link active">Events</h2>
            <h2
              // to="/groups"
              className="group-link"
              onClick={() => history.push("/groups")}
            >
              Groups
            </h2>
          </div>
        </div>
      </div>
      {events.length === 0 && (keywords?.length > 0 || location?.length > 0) && (
        <div className="flex-column">
          <div className="not-found-image">
            <img src="https://secure.meetupstatic.com/next/images/find/emptyResultsIcon.svg?w=384" />
          </div>
          <span className="not-found-text">
            {`Sorry, there are no events results for "${keywords}" near you.`}
          </span>
          <button className="not-found-button" onClick={handleReset}>
            See results for groups instead.
          </button>
        </div>
      )}
      {events.length > 0 && (
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
                      {new Date(event.startDate).getMinutes() == 0
                        ? 0
                        : ""}{" "}
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
      )}
    </>
  );
};

export default Events;
