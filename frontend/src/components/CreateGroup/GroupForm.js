import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createGroup, editGroupThunk } from "../../store/group";

const GroupForm = ({ group, formType }) => {
  const history = useHistory();
  // const { groupId } = useParams();
  // console.log("group in gorupform as arg", group);
  //   const [organizerId, setOrganizer] = useState(group.organizerId);
  let privacy = group.private === true ? "Private" : "Public";
  const [name, setName] = useState(group.name);
  const [about, setAbout] = useState(group.about);
  const [type, setType] = useState(group.type);
  const [isPrivate, setPrivate] = useState(privacy);
  const [city, setCity] = useState(group.city);
  const [state, setState] = useState(group.state);
  const [previewImage, setPreviewImg] = useState(group.previewImage);
  const [errors, setErrors] = useState([]);

  // let privacy = group.private === true ? "Private" : "Public";
  // if (formType === "Update Group") setPrivate(privacy);
  console.log("isPrivate", isPrivate);

  // let image =
  //   formType === "Create Group" ? previewImg : group.GroupImages[0].url;
  let update = formType === "Create Group" ? true : false;
  // const groupId = formType === "Edit Group" ? group.id : null;
  // previewImg = formType === "Create Group" ? "" : group.GroupImages[0].url;
  const dispatch = useDispatch();

  useEffect(() => {
    const newErrors = [];
    if (name?.length > 60) newErrors.push("Name must be 60 characters or less");
    if (name?.length === 0)
      newErrors.push("You must enter the name for your group");
    if (about?.length < 50)
      newErrors.push("About must be 50 characters or more");
    if (about?.length === 0)
      newErrors.push("You must enter the about for your group");
    if (type !== "Online" && type !== "In person")
      newErrors.push("Type must be 'Online' or 'In person'");
    if (isPrivate !== true || false)
      newErrors.push("You need to set the privacy of your group");
    if (update && previewImage?.length === 0)
      newErrors.push("You need to upload your first image for your group");
    if (city?.length === 0)
      newErrors.push("You need to set the city of your group");
    if (state?.length === 0)
      newErrors.push("You need to set the state of your group");

    setErrors(newErrors);
  }, [name, about, type, isPrivate, previewImage, city, state]);

  console.log("enter the GroupForm component======================");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // let priv = isPrivate == "Public" ? false : true;
    let priv;
    if (isPrivate === "Public") priv = false;
    else if (isPrivate === "Private") priv = true;
    // else if (isPrivate === true || isPrivate === false) priv = isPrivate;
    console.log(
      "---------------the privacy in groupForm component---------------",
      isPrivate,
      priv
    );

    group = {
      ...group,
      // id: groupId,
      name,
      about,
      type,
      // there is some problem with it
      private: priv,
      city,
      state,
      // previewImage,
    };
    let img = {};
    if (previewImage?.length > 0) {
      img = {
        url: previewImage,
        preview: true,
      };
    }

    setErrors([]);
    console.log("the group id in edit groupform", group.id);

    const newGroup =
      formType === "Create Group"
        ? await dispatch(createGroup(group, img))
        : await dispatch(editGroupThunk(group, group.id));

    console.log(
      "here is the new group created in CreateForm component=================",
      newGroup
    );
    if (newGroup) return history.push(`/groups/${newGroup.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>{formType}</h2>
      <label>
        Group name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        About
        <input
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
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
          <option key={"Online"}>Online</option>
          <option key={"In person"}>In person</option>
        </select>
      </label>
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
        {/* <input
          type="radio"
          name="isPrivate"
          //   value="private"
          value="Private"
          checked={isPrivate === "Private" ? "checked" : ""}
          onChange={(e) => setPrivate(e.target.value)}
        />
        private
        <input
          type="radio"
          name="isPrivate"
          value="Public"
          checked={isPrivate === "Public" ? "checked" : ""}
          onChange={(e) => setPrivate(e.target.value)}
        />
        public */}
        {/* NOTE!!!! */}
        {/* For some reason, I can't get the preview imgae link when I update */}
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
      {/* <AddImage /> */}
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default GroupForm;
