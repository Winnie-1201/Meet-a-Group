import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GroupForm from "./GroupForm";

const EditGroup = () => {
  const { groupId } = useParams();
  const group = useSelector((state) => state.group)[groupId];
  // let report;
  // if (isNaN(Number(reportId)))
  //   report = reports.find((report) => report.id === reportId);
  // else report = reports.find((report) => report.id === +reportId);

  return <GroupForm group={group} formType="Update Group" />;
};

export default EditGroup;
