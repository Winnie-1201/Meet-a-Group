import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGroupById, removeGroup } from "../../store/group";

const GroupDetails = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupById(groupId));
  }, [dispatch]);

  // const group = useSelector((state) => state.group)[groupId];
  const currentUser = useSelector((state) => state.session.user);
  const group = useSelector((state) => state.group)[groupId];
  console.log(
    "the group in groupdetails in GroupDetails component====================",
    group
  );

  if (!group) return null;
  if (!group.Organizer) return null;

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
