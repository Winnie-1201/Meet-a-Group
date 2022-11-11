import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEvent, editEvent } from "../../store/event";
import Footer from "../Footer";
import Navigation from "../Navigation";
import "./EventForm.css";

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
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  // console.log("enter the EventForm component================");

  let create = formType === "Create Event" ? true : false;

  useEffect(() => {
    const newErrors = {};
    if (name?.length < 5)
      newErrors.name = "Event name needs to be at 5 least characters";
    if (type !== "Online" && type !== "In person")
      newErrors.type = "Please choose the type of the event";
    if (capacity.length === 0 || capacity < 0)
      newErrors.capacity = "Please enter the valid capacity of the event";
    if (price.length === 0 || price < 0)
      newErrors.price = "Please enter the valid price of the event";
    if (description?.length === 0)
      newErrors.description = "Please enter the description of the event";
    if (!startDate)
      newErrors.startDate = "Please enter the start date of the event";
    if (!endDate) newErrors.endDate = "Please enter the end date of the event";
    if (new Date(startDate) < new Date())
      newErrors.validStartDate =
        "Please enter the valid start date for the event";
    if (new Date(endDate) <= new Date(startDate))
      newErrors.validEndDate = "Please enter the valid end date for the event";
    if (create && previewImage?.length === 0)
      newErrors.previewImage =
        "Please enter the url of the first image for the event";

    setErrors(newErrors);
  }, [
    name,
    type,
    capacity,
    previewImage,
    price,
    description,
    startDate,
    endDate,
  ]);

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

    // console.log("here is the new event created ================", newEvent);

    if (newEvent) return history.push(`/events/${newEvent.id}`);
  };

  return (
    <>
      <Navigation window={window} />
      <form onSubmit={handleSubmit} className="event-form">
        <h1>{formType}</h1>
        <label>
          Event name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && (
          <p className="error-message-event-form">{errors.name}</p>
        )}
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
        {errors.type && (
          <p className="error-message-event-form">{errors.type}</p>
        )}
        <label>
          Capacity
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </label>
        {errors.capacity && (
          <p className="error-message-event-form">{errors.capacity}</p>
        )}
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        {errors.price && (
          <p className="error-message-event-form">{errors.price}</p>
        )}
        {create && (
          <label>
            Preview image
            <input
              type="text"
              value={previewImage}
              onChange={(e) => setPreviewImg(e.target.value)}
            />
          </label>
        )}
        {create && errors.previewImage && (
          <p className="error-message-event-form">{errors.previewImage}</p>
        )}
        <label>
          Description
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {errors.description && (
          <p className="error-message-event-form">{errors.description}</p>
        )}
        <label>
          Start Date (i.e. 2023-11-19 20:00:00)
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        {errors.startDate && (
          <p className="error-message-event-form">{errors.startDate}</p>
        )}
        {errors.validStartDate && (
          <p className="error-message-event-form">{errors.validStartDate}</p>
        )}
        <label>
          End Date (i.e. 2023-11-19 21:00:00)
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        {errors.endDate && (
          <p className="error-message-event-form">{errors.endDate}</p>
        )}
        {errors.validEndDate && (
          <p className="error-message-event-form">{errors.validEndDate}</p>
        )}
        <button>Submit</button>
      </form>
      <Footer window={window} />
    </>
  );
};

export default EventForm;
