import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getGroupById, removeGroup } from "../../store/group";
// import { removeImgThunk } from "../../store/image";

const GroupDetails = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupById(groupId));
    // helper(groupId);
  }, [dispatch]);

  // const group = useSelector((state) => state.group)[groupId];
  const currentUser = useSelector((state) => state.session.user);
  const group = useSelector((state) => state.group)[groupId];
  console.log("the group in groupdetails", group);

  if (!group) return null;
  if (!group.Organizer) return null;
  //   console.log("the group", group);

  // const history = useHistory();

  // then do the delete and edit here!!
  // const handleDelete = async (e) => {
  //   e.preventDefault();

  //   const deleted = await dispatch(removeGroup(group.id));
  //   console.log("the deleted item is:", deleted);
  //   // history.push("/groups/current");
  //   // dispatch(removeImgThunk())
  //   if (deleted.length > 0) return history.push("/groups/current");
  // };

  //   const handleUpdate = async (e) => {
  //     e.preventDefault();
  //   };

  // if (!group) return history.push("/groups");
  // group = Object.values(group)[0];

  return (
    <>
      <div>
        <h2>{group.name}</h2>
        <p>
          Organizer: {group.Organizer.lastName}, {group.Organizer.firstName}
        </p>
        <p>About: {group.about}</p>
        <img src={`${group.GroupImages[0].url}`} />
        {currentUser && currentUser.id === group.organizerId && (
          <>
            <Link to={`/groups/current/${groupId}/edit`}>Edit</Link>
            <button onClick={() => dispatch(removeGroup(groupId))}>
              Delete
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default GroupDetails;
