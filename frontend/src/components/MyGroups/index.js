import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGroupByUserThunk } from "../../store/group";

const MyGroups = () => {
  // const { userId } = useParams();
  // console.log("organizerId", userId);
  // const currentUser = useSelector((state) => state.session.user);
  const groups = Object.values(useSelector((state) => state.group));
  console.log(
    "here is all my groups in MyGroups component!!!!=======================",
    groups
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupByUserThunk());
  }, [dispatch]);

  if (!groups.length > 0)
    return (
      <>
        <p>You don't have any group yet.</p>
        <Link to="/groups/current/new">Go to create your first group!</Link>
      </>
    );

  return (
    <>
      <div>
        <h2>My groups</h2>
        {groups.map((group) => (
          <Link key={group.id} to={`/groups/${group.id}`} className="nav-link">
            <span>
              <p>{group.name}</p>
              <p>About: {group.about}</p>
              <p>Type: {group.type}</p>
              <img src={`${group.previewImage}`} />
            </span>
          </Link>
        ))}
      </div>
      <Link to="/groups/current/new">Create a new groups</Link>
    </>
  );
};

export default MyGroups;
