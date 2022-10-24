import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGroupById } from "../../store/group";
import GroupForm from "./GroupForm";

const EditGroup = () => {
  const { groupId } = useParams();
  console.log("------------groupId", groupId);
  const dispatch = useDispatch();

  const group = Object.values(
    useSelector((state) => state.group.singleGroup)
  )[0];
  // const group = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(getGroupById(groupId));
  }, [dispatch]);
  console.log("group details in edit group comp: ", group);
  if (!group) return null;
  return <GroupForm group={group} formType="Update Group" />;
};

export default EditGroup;
