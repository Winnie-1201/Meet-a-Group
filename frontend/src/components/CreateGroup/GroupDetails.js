import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { removeGroup } from "../../store/group";

const GroupDetails = () => {
  const { groupId } = useParams();
  //   console.log("groupId", groupId);
  const group = useSelector((state) => state.group)[groupId];
  // console.log("the group in groupdetails", group)
  const currentUser = useSelector((state) => state.session.user);
  //   console.log("the group", group);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!group) return history.push("/groups");

  return (
    <>
      <div>
        <h2>{group.name}</h2>
        <p>About: {group.about}</p>
        <img src={`${group.previewImage}`} />
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
