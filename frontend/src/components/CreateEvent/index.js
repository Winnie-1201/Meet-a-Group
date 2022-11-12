import { useParams } from "react-router-dom";
import EventForm from "./EventForm";

const CreateEvent = () => {
  const { groupId } = useParams();

  const event = {
    venueId: 1,
    name: "",
    type: "",
    capacity: "",
    price: "",
    description: "",
    startDate: "",
    endDate: "",
    previewImage: "",
  };
  return <EventForm event={event} groupId={groupId} formType="Create Event" />;
};

export default CreateEvent;
