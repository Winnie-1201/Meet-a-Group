import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createGroup } from "../../store/group";
import { createImg } from "../../store/image";
// import AddImage from "./AddImage";

const GroupForm = ({ group, formType }) => {
  const history = useHistory();

  //   const [organizerId, setOrganizer] = useState(group.organizerId);
  const [name, setName] = useState(group.name);
  const [about, setAbout] = useState(group.about);
  const [type, setType] = useState(group.type);
  const [isPrivate, setPrivate] = useState(group.private);
  const [city, setCity] = useState(group.city);
  const [state, setState] = useState(group.state);
  //   const [previewImg, setPreviewImg] = useState(group.previewImage);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    group = {
      ...group,
      //   organizerId,
      name,
      about,
      type,
      private: isPrivate,
      city,
      state,
      //   previewImage: previewImg,
    };
    const newGroup = await dispatch(createGroup(group));
    history.push(`/groups/${newGroup.id}`);

    // console.log(group);
    // const newGroup = await dispatch(createGroup(group));
    // console.log("this is the new group", newGroup);
    // if (previewImg.length > 0 && newGroup) {
    //   const img = {
    //     groupId: newGroup.id,
    //     url: previewImg,
    //     preview: true,
    //   };
    //   const newImg = await dispatch(createImg(img));
    //   console.log("this is the new img", newImg);
    //   if (newImg && newGroup) history.push(`/groups/current/${newGroup.id}`);
    // }
    // console.log("the new group in comp", newGroup);

    // can change it to the new group page later
    // if (newGroup) history.push(`/groups/current/${newGroup.id}`);
  };
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>{formType}</h2>
      <label>
        Group name
        <input
          typr="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        About
        <input
          typr="text"
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
        <input
          type="radio"
          name="isPrivate"
          //   value="private"
          value="true"
          checked={isPrivate === "true" ? "checked" : ""}
          onChange={(e) => setPrivate(e.target.value)}
        />
        private
        <input
          type="radio"
          name="isPrivate"
          value="false"
          checked={isPrivate === "false" ? "checked" : ""}
          onChange={(e) => setPrivate(e.target.value)}
        />
        public
      </label>
      {/* <label>
        Preview image
        <input
          type="text"
          value={previewImg}
          onChange={(e) => setPreviewImg(e.target.value)}
        />
      </label> */}
      {/* <AddImage /> */}
      <label>
        City
        <input
          typr="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label>
        State
        <input
          typr="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default GroupForm;
