import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { removeGroup } from "../../store/group";
// import { removeImgThunk } from "../../store/image";

const GroupDetails = () => {
  const { groupId } = useParams();
  //   console.log("groupId", groupId);
  const group = useSelector((state) => state.group)[groupId];
  const currentUser = useSelector((state) => state.session.user);
  //   console.log("the group", group);
  const dispatch = useDispatch();
  const history = useHistory();

  // then do the delete and edit here!!
  const handleDelete = async (e) => {
    e.preventDefault();

    await dispatch(removeGroup(group.id));
    // console.log("the deleted item is:", deleted);
    // history.push("/groups/current");
    // dispatch(removeImgThunk())
  };

  //   const handleUpdate = async (e) => {
  //     e.preventDefault();
  //   };

  if (!group) return history.push("/groups/current");

  return (
    <>
      <div>
        <h2>{group.name}</h2>
        <p>About: {group.about}</p>
        <img src={`${group.previewImage}`} />
        {currentUser && currentUser.id === group.organizerId && (
          <>
            <Link to={`/groups/current/${groupId}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </>
  );
};

export default GroupDetails;
