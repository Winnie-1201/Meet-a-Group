import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GroupForm from "./GroupForm";

const EditGroup = () => {
  const { groupId } = useParams();
  const group = useSelector((state) => state.group)[groupId];
  console.log("group details in edit group comp: ", group);
  return <GroupForm group={group} formType="Update Group" />;
};

export default EditGroup;
