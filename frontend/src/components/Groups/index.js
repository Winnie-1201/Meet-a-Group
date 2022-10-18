// import { useEffect } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../store/group";
import "./groups.css";
// import MyGroups from "./MyGroups";

const Groups = () => {
  // const currentUser = useSelector((state) => state.session.user);
  const groups = Object.values(useSelector((state) => state.group));

  //   console.log("groups in compn!!!!", groups);
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
      {/* <Route exact path="/groups/:organizerId/mygoups"> */}
      {/* <MyGroups /> */}
      {/* </Route> */}
    </>
  );
};

export default Groups;
