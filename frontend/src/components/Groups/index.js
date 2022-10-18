// import { useEffect } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../store/group";
import "./groups.css";

const Groups = () => {
  // const currentUser = useSelector((state) => state.session.user);
  const groups = Object.values(useSelector((state) => state.group));

  console.log(
    "all of the groups in Groups component!!!!==============",
    groups
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  if (!groups) return null;

  return (
    <>
      <div>
        <h2>All groups</h2>
        {groups.map((group) => (
          <Link to={`/groups/${group.id}`} key={group.id} className="nav-link">
            <p>{group.name}</p>
            <p>About: {group.about}</p>
            <p>Type: {group.type}</p>
            <img src={`${group.previewImage}`} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Groups;