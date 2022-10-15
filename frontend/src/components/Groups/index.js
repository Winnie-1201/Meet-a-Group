// import { useEffect } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../store/group";
import "./groups.css";

const Groups = () => {
  const groups = Object.values(useSelector((state) => state.group))[0];

  console.log("groups in compn!!!!", groups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  if (!groups) return null;

  return (
    <div>
      <h2>All groups</h2>
      {groups.map((group) => (
        <div key={group.id} className="group-session">
          <p>{group.name}</p>
          <p>About: {group.about}</p>
          <p>Type: {group.type}</p>
          <img src={`${group.previewImage}`} />
        </div>
      ))}
    </div>
  );
};

export default Groups;
