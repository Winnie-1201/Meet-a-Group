// import { nanoid } from 'nanoid';
import { useSelector } from "react-redux";
import GroupForm from "./GroupForm";

const CreateGroup = () => {
  const currUser = useSelector((state) => state.session.user);
  console.log("enter the createGroup component==================");
  const group = {
    organizerId: currUser.id,
    name: "",
    about: "",
    type: "Online",
    private: "Private",
    city: "",
    state: "",
    // previewImage: "",
  };
  return <GroupForm group={group} formType="Create Group" />;
};

export default CreateGroup;
