import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createGroup, editGroupThunk } from "../../store/group";
import Footer from "../Footer";
import Navigation from "../Navigation";
import "./GroupForm.css";

const GroupForm = ({ group, formType }) => {
  const history = useHistory();
  // const { groupId } = useParams();
  // console.log("group in gorupform as arg", group);
  //   const [organizerId, setOrganizer] = useState(group.organizerId);
  // let privacy = group.private === true ? "Private" : "Public";
  let privacy;
  if (group.private === true) privacy = "Private";
  else if (group.private === false) privacy = "Public";
  else privacy = "";

  const [name, setName] = useState(group.name);
  const [about, setAbout] = useState(group.about);
  const [type, setType] = useState(group.type);
  const [isPrivate, setPrivate] = useState(privacy);
  const [city, setCity] = useState(group.city);
  const [state, setState] = useState(group.state);
  const [previewImage, setPreviewImg] = useState(group.previewImage);
  // const [errors, setErrors] = useState([]);
  const [errors, setErrors] = useState({});

  let create = formType === "Create Group" ? true : false;

  const dispatch = useDispatch();

  useEffect(() => {
    // const newErrors = [];
    // if (name?.length > 60) newErrors.push("Name must be 60 characters or less");
    // if (name?.length === 0)
    //   newErrors.push("You must enter the name for your group");
    // if (about?.length < 50)
    //   newErrors.push("About must be 50 characters or more");
    // if (about?.length === 0)
    //   newErrors.push("You must enter the about for your group");
    // if (type !== "Online" && type !== "In person")
    //   newErrors.push("Type must be 'Online' or 'In person'");
    // if (isPrivate !== true || false)
    //   newErrors.push("You need to set the privacy of your group");
    // if (create && previewImage?.length === 0)
    //   newErrors.push("You need to upload your first image for your group");
    // if (city?.length === 0)
    //   newErrors.push("You need to set the city of your group");
    // if (state?.length === 0)
    //   newErrors.push("You need to set the state of your group");
    const newErrors = {};
    if (name?.length > 60)
      newErrors.name = "Name must be 60 characters or less";
    if (name?.length === 0)
      newErrors.name = "You must enter the name for your group";
    if (about?.length < 50)
      newErrors.about = "About must be 50 characters or more";
    if (about?.length === 0)
      newErrors.about = "You must enter the about for your group";
    if (type !== "Online" && type !== "In person")
      newErrors.type = "Type must be 'Online' or 'In person'";
    if (
      isPrivate !== true &&
      isPrivate !== false &&
      isPrivate !== "Public" &&
      isPrivate !== "Private"
    )
      newErrors.isPrivate = "You need to set the privacy of your group";
    if (create && !previewImage)
      newErrors.previewImg =
        "You need to upload your first image for your group";
    if (city?.length === 0)
      newErrors.city = "You need to set the city of your group";
    if (state?.length === 0)
      newErrors.state = "You need to set the state of your group";

    setErrors(newErrors);
  }, [name, about, type, isPrivate, previewImage, city, state]);

  // console.log("========error-------------", errors.isPrivate, isPrivate);

  // console.log("enter the GroupForm component======================");
  const handleSubmit = async (e) => {
    e.preventDefault();

    let priv;
    if (isPrivate === "Public") priv = false;
    else if (isPrivate === "Private") priv = true;

    // console.log(
    //   "---------------the privacy in groupForm component---------------",
    //   isPrivate,
    //   priv
    // );

    group = {
      ...group,
      // id: groupId,
      name,
      about,
      type,
      private: priv,
      city,
      state,
    };

    let img = {};
    if (previewImage?.length > 0) {
      img = {
        url: previewImage,
        preview: true,
      };
    }

    setErrors([]);
    // console.log("the group id in edit groupform", group.id);

    const newGroup =
      formType === "Create Group"
        ? await dispatch(createGroup(group, img))
        : await dispatch(editGroupThunk(group, group.id));

    // console.log(
    //   "here is the new group created in CreateForm component=================",
    //   newGroup
    // );
    if (newGroup) return history.push(`/groups/${newGroup.id}`);
  };

  return (
    <>
      <Navigation window={window} />
      <form onSubmit={handleSubmit} className="group-form">
        {/* <div className="group-form-body"> */}
        <h1>{formType}</h1>
        {/* <ul className="error-messages-group-form">
        {errors.length > 0 &&
          errors.map((error) => (
            <li className="error-detail-group-form" key={error}>
              {error}
            </li>
          ))}
      </ul> */}
        <label>
          Group name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.name}</li>
          </ul>
        )}
        <label>
          About
          <textarea
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </label>
        {errors.about && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.about}</li>
          </ul>
        )}
        <label className="group-label-type">
          Type
          <select
            name="attendType"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Please select a type...
            </option>
            <option key={"Online"}>Online</option>
            <option key={"In person"}>In person</option>
          </select>
        </label>
        {errors.type && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.type}</li>
          </ul>
        )}
        <label>
          Private or public?
          <select
            name="privacy"
            value={isPrivate}
            onChange={(e) => setPrivate(e.target.value)}
          >
            <option value="" disabled>
              Please select...
            </option>
            <option key={"Private"}>Private</option>
            <option key={"Public"}>Public</option>
          </select>
          {errors.isPrivate && (
            <ul className="error-messages-group-form">
              <li className="error-detail-group-form">{errors.isPrivate}</li>
            </ul>
          )}
        </label>
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
        {errors.previewImg && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.previewImg}</li>
          </ul>
        )}
        {/* <AddImage /> */}
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        {errors.city && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.city}</li>
          </ul>
        )}
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        {errors.state && (
          <ul className="error-messages-group-form">
            <li className="error-detail-group-form">{errors.state}</li>
          </ul>
        )}
        <button>Submit</button>
        {/* </div> */}
      </form>
      <Footer window={window} />
    </>
  );
};

export default GroupForm;
