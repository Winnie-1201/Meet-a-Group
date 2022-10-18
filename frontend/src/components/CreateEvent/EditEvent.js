import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EventForm from "./EventForm";

const EditEvent = () => {
  const { eventId } = useParams();
  const event = useSelector((state) => state.event)[eventId];
  const groupId = event.groupId;
  console.log("event details in edit event comp========", event);
  return <EventForm event={event} groupId={groupId} formType="Update Event" />;
};

export default EditEvent;
