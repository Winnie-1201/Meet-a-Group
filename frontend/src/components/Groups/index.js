// import { useEffect } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../store/group";
import "./groups.css";

const Groups = () => {
  // const currentUser = useSelector((state) => state.session.user);
  const groups = Object.values(useSelector((state) => state.group.allGroups));

  // console.log(
  //   "all of the groups in Groups component!!!!==============",
  //   groups
  // );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  if (!groups.length) return null;

  return (
    <>
      {/* <div className="event-groups-content"> */}
      <div className="all-groups-body">
        <div className="all-groups">
          {/* <h2 className="group-header">All groups</h2> */}
          {groups.map((group) => (
            <div className="one-group" key={group.id}>
              <Link to={`/groups/${group.id}`} className="one-group-link">
                <div className="group-image">
                  <img className="group-img" src={`${group?.previewImage}`} />
                </div>
                <div className="one-group-detail">
                  <p className="group-name">{group.name}</p>
                  <p className="group-location">
                    {group.city}, {group.state}
                  </p>
                  <p className="group-about">{group.about}</p>
                  <p className="group-type">
                    {group.numMembers} members · {group.type}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div></div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Groups;
