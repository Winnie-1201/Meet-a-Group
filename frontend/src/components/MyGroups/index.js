import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGroupByUserThunk } from "../../store/group";
// import { getGroups } from "../../store/group";

const MyGroups = () => {
  // const { userId } = useParams();
  // console.log("organizerId", userId);
  // const currentUser = useSelector((state) => state.session.user);
  const groups = Object.values(useSelector((state) => state.group));
  // console.log("groupsss!!!!", groups);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrGroups());
  // }, [dispatch]);
  // does not work
  useEffect(() => {
    dispatch(getGroupByUserThunk());
  }, [dispatch]);

  // if (!groups) return null;
  // const myGroups = groups.filter(
  //   (group) => group.organizerId === currentUser.id
  // );
  // console.log("groupsss!!!!", myGroups);
  if (!groups.length > 0)
    return (
      <>
        <p>You don't have any group yet.</p>
        <Link to="/groups/current/new">Go to create your first group!</Link>
      </>
    );

  // console.log("groupsss!!!!", myGroups);

  return (
    <>
      <div>
        <h2>My groups</h2>
        {groups.map((group) => (
          <Link
            to={`/groups/current/${group.id}`}
            key={group.id}
            className="nav-link"
          >
            <span>
              <p>{group.name}</p>
              <p>About: {group.about}</p>
              <p>Type: {group.type}</p>
              <img src={`${group.previewImage}`} />
            </span>
            {/* <button onClick={() => dispatch(removeGroup(group))}>Delete</button> */}
          </Link>
        ))}
      </div>
      <Link to="/groups/current/new">Create a new groups</Link>
    </>
  );
};

export default MyGroups;
