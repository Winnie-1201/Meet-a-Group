import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createGroup, editGroupThunk } from "../../store/group";

const GroupForm = ({ group, formType }) => {
  const history = useHistory();

  //   const [organizerId, setOrganizer] = useState(group.organizerId);
  const [name, setName] = useState(group.name);
  const [about, setAbout] = useState(group.about);
  const [type, setType] = useState(group.type);
  const [isPrivate, setPrivate] = useState(group.private);
  const [city, setCity] = useState(group.city);
  const [state, setState] = useState(group.state);
  const [previewImage, setPreviewImg] = useState(group.previewImage);

  // let image =
  //   formType === "Create Group" ? previewImg : group.GroupImages[0].url;

  let update = formType === "Create Group" ? true : false;
  // previewImg = formType === "Create Group" ? "" : group.GroupImages[0].url;
  const dispatch = useDispatch();

  console.log("enter the GroupForm component======================");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // let priv = isPrivate === "Private" ? true : false;

    group = {
      ...group,
      name,
      about,
      type,
      private: isPrivate,
      city,
      state,
      previewImage,
    };
    let img = {};
    if (previewImage.length > 0) {
      img = {
        url: previewImage,
        preview: true,
      };
    }

    const newGroup =
      formType === "Create Group"
        ? await dispatch(createGroup(group, img))
        : await dispatch(editGroupThunk(group));

    console.log(
      "here is the new group created in CreateForm component=================",
      newGroup
    );
    if (newGroup) return history.push(`/groups/current`);
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
          <option>Online</option>
          <option>In person</option>
        </select>
      </label>
      <label>
        Private or public?
        <select
          name="isPrivate"
          value={isPrivate}
          onChange={(e) => setPrivate(e.target.value)}
        >
          <option value="" disabled>
            Please select...
          </option>
          <option>Private</option>
          <option>Public</option>
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
