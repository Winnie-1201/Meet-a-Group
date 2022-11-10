import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGroupByUserThunk } from "../../store/group";
import "./MyGroups.css";

const MyGroups = () => {
  const currUser = useSelector((state) => state.session.user);

  const [showJoinedGroups, setJoinGroups] = useState(false);
  const [showHostedGroups, setHostGroups] = useState(true);

  const groups = Object.values(useSelector((state) => state.group.allGroups));
  const hostGroups = groups.filter(
    (group) => group.organizerId === currUser.id
  );
  const joinedGroups = groups.filter(
    (group) => group.organizerId !== currUser.id
  );
  // console.log(
  //   "here is all my groups in MyGroups component!!!!=======================",
  //   groups,
  //   hostGroups,
  //   joinedGroups
  // );

  const dispatch = useDispatch();

  const helpDelay = async () => {
    await dispatch(getGroupByUserThunk());
  };

  useEffect(() => {
    helpDelay();
  }, [dispatch]);

  if (!groups.length > 0)
    return (
      <div className="mygroup-nogroup">
        <p>You don't have any group yet.</p>
        <Link className="create-group-nav-link" to="/groups/current/new">
          Go to create your first group!
        </Link>
      </div>
    );

  return (
    <div>
      <div className="mygroups-body">
        <div className="mygroups-header">
          <h2
            onClick={() => {
              setHostGroups(true);
              setJoinGroups(false);
            }}
            className={`${
              showHostedGroups === true ? "change-color" : ""
            } margin-right`}
          >
            Groups hosted
          </h2>
          <h2
            onClick={() => {
              setHostGroups(false);
              setJoinGroups(true);
            }}
            className={`${
              showJoinedGroups === true ? "change-color" : ""
            } margin-right`}
          >
            Groups joined
          </h2>
          <div className="group-nav-link">
            <Link className="nav-link-text" to="/groups/current/new">
              Create a new groups
            </Link>
          </div>
        </div>
        {showHostedGroups && (
          <div className="groups-detail-container">
            <div className="mygroups-detail">
              {hostGroups.map((group) => (
                <div className="mygroup-info" key={group.name}>
                  <div className="mygroup-image">
                    <img
                      className="mygroup-img"
                      src={`${group?.previewImage}`}
                    />
                  </div>
                  <div className="text-detail">
                    <p className="mygroup-name">{group.name}</p>
                    <p>
                      Click{" "}
                      <Link
                        className="mygroup-nav-link"
                        to={`/groups/${group.id}`}
                      >
                        here
                      </Link>{" "}
                      to see more details.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {showJoinedGroups && (
          <div className="mygroups-detail">
            {joinedGroups.map((group) => (
              <div className="mygroup-info" key={group.name}>
                <div className="mygroup-image">
                  <img className="mygroup-img" src={`${group?.previewImage}`} />
                </div>
                <div className="text-detail">
                  <p className="mygroup-name">{group.name}</p>
                  <p>
                    Click{" "}
                    <Link
                      className="mygroup-nav-link"
                      to={`/groups/${group.id}`}
                    >
                      here
                    </Link>{" "}
                    to see more details.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGroups;
