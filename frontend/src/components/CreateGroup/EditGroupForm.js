import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GroupForm from "./GroupForm";

const EditGroup = () => {
  // const { groupId } = useParams();
  const group = Object.values(
    useSelector((state) => state.group.singleGroup)
  )[0];
  console.log("group details in edit group comp: ", group);
  return <GroupForm group={group} formType="Update Group" />;
};

export default EditGroup;
