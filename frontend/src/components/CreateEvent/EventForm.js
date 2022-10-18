import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEvent, editEvent } from "../../store/event";

const EventForm = ({ event, groupId, formType }) => {
  const history = useHistory();

  const [name, setName] = useState(event.name);
  const [type, setType] = useState(event.type);
  const [capacity, setCapacity] = useState(event.capacity);
  const [price, setPrice] = useState(event.price);
  const [description, setDescription] = useState(event.description);
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const [previewImage, setPreviewImg] = useState(event.previewImage);

  const dispatch = useDispatch();

  console.log("enter the EventForm component================");

  let update = formType === "Create Event" ? true : false;

  const handleSubmit = async (e) => {
    e.preventDefault();

    event = {
      ...event,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
      previewImage,
    };

    let img = {};
    if (previewImage) {
      img = {
        url: previewImage,
        preview: true,
      };
    }
    const newEvent =
      formType === "Create Event"
        ? await dispatch(createEvent(event, groupId, img))
        : await dispatch(editEvent(event));

    console.log("here is the new event created ================", newEvent);

    if (newEvent) return history.push(`/groups/${groupId}`);
  };
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>{formType}</h2>
      <label>
        Event name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Type
        <select
          name="attendType"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="" disabled>
            Please select a type...
          </option>
          <option>Online</option>
          <option>In person</option>
        </select>
      </label>
      <label>
        Capacity
        <input
          type="text"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </label>
      <label>
        Price
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      {update && (
        <label>
          Preview image
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImg(e.target.value)}
          />
        </label>
      )}
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Start Date
        <input
          type="text"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date
        <input
          type="text"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default EventForm;
