import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGroupByUserThunk } from "../../store/group";
import "./MyGroups.css";
const MyGroups = () => {
  // const { userId } = useParams();
  // console.log("organizerId", userId);
  // const currentUser = useSelector((state) => state.session.user);
  const groups = Object.values(useSelector((state) => state.group.allGroups));
  console.log(
    "here is all my groups in MyGroups component!!!!=======================",
    groups
  );
  const dispatch = useDispatch();

  const helpDelay = async () => {
    await dispatch(getGroupByUserThunk());
  };

  useEffect(() => {
    helpDelay();
    // dispatch(getGroupByUserThunk());
  }, [dispatch]);

  // if (!group.id) return null;
  if (!groups.length > 0)
    return (
      <>
        <p>You don't have any group yet.</p>
        <Link to="/groups/current/new">Go to create your first group!</Link>
      </>
    );

  return (
    <div>
      <div className="mygroups-body">
        <div className="mygroups-header">
          <h2>My groups</h2>
          <div className="group-nav-link">
            <Link className="nav-link-text" to="/groups/current/new">
              Create a new groups
            </Link>
          </div>
        </div>
        <div className="mygroups-detail">
          {groups.map((group) => (
            // <div className="mygroups-detail" }>
            <div className="mygroup-info" key={group.name}>
              <div className="mygroup-image">
                <img className="mygroup-img" src={`${group?.previewImage}`} />
              </div>
              <div className="text-detail">
                <p className="mygroup-name">{group.name}</p>
                <Link className="mygroup-nav-link" to={`/groups/${group.id}`}>
                  more
                </Link>
              </div>
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
