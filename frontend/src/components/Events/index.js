import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEvents } from "../../store/event";

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
      <div>
        <h2>All events</h2>
        {events.map((event) => (
          <Link to={`/events/${event.id}`} key={event.id} className="nav-link">
            <p>{event.name}</p>
            <p>Type: {event.type}</p>
            <img src={event.previewImage} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Events;
