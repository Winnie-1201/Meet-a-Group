// import { nanoid } from 'nanoid';
import { useSelector } from "react-redux";
import GroupForm from "./GroupForm";

const CreateGroup = () => {
  const currUser = useSelector((state) => state.session.user);
  const group = {
    organizerId: currUser.id,
    name: "",
    about: "",
    type: "",
    private: "",
    city: "",
    state: "",
    // previewImage: "",
  };
  return <GroupForm group={group} formType="Create Group" />;
};

export default CreateGroup;
