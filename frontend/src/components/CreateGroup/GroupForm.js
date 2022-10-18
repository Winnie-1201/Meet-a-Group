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
  let [previewImg, setPreviewImg] = useState(group.previewImage);

  previewImg =
    formType === "Create Group" ? group.previewImage : group.GroupImages[0].url;
  const dispatch = useDispatch();

  console.log("enter the GroupForm component======================");
  const handleSubmit = async (e) => {
    e.preventDefault();

    group = {
      ...group,
      name,
      about,
      type,
      private: isPrivate,
      city,
      state,
      previewImage: previewImg,
    };
    let img = {};
    if (previewImg.length > 0) {
      img = {
        url: previewImg,
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
      <label>
        Preview image
        <input
          type="text"
          value={previewImg}
          onChange={(e) => setPreviewImg(e.target.value)}
        />
      </label>
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
