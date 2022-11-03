import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getEventByGroup } from "../../store/event";
import { getGroupById, removeGroup } from "../../store/group";
import { getAllMembers, requestMembership } from "../../store/member";
import "./GroupDetails.css";

function getRandomColor() {
  var letters = "ABCDEF0123456789";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// function getYourColor(firstName) {
//   var letters = "ABCDEF0123456789";

//   var color = "#";
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor((firstName.length / 10) * 16)];
//   }
//   return color;
// }

const GroupDetails = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showAbout, setAbout] = useState(true);
  const [showEvents, setEvents] = useState(false);
  const [showMembers, setMembers] = useState(false);
  const [showAllMembers, setAllMembers] = useState(true);
  const [showLeader, setLeader] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const group = Object.values(
    useSelector((state) => state.group.singleGroup)
  )[0];

  const members = useSelector((state) => state.member.allMembers);

  const currentUser = useSelector((state) => state.session.user);

  const events = Object.values(useSelector((state) => state.event.allEvents));
  // console.log("all members", allMembers);
  // console.log(
  //   "the group in groupdetails in GroupDetails component====================",
  //   group
  // );

  useEffect(() => {
    dispatch(getAllMembers(groupId))
      .then(() => dispatch(getEventByGroup(groupId)))
      .then(() => dispatch(getGroupById(groupId)))
      .then(() => setLoaded(true));
    // dispatch(getAllMembers(groupId));
    // dispatch(getEventByGroup(groupId));
    // dispatch(getGroupById(groupId));
  }, [dispatch]);

  // console.log(
  //   "here are all the events in GroupDetaisl comp===========",
  //   events
  // );

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await dispatch(removeGroup(groupId));
    if (deleted) return history.push("/groups/current");
  };

  let pending = false;
  const handleJoinGroup = async (e) => {
    e.preventDefault();

    const newMember = await dispatch(requestMembership(groupId));
    console.log("-----------new member created", newMember);
    if (newMember) {
      pending = newMember.status;
      history.push(`/groups/${groupId}`);
    }
  };

  // console.log("is pending ----", pending);
  // if (!group) return null;
  // if (!group?.Organizer) return null;
  // const allMembers = Object.values(members);
  // console.log("all member------------", allMembers);

  // check if the current user is the host
  // let isMember;

  let allMembers;

  let groupMember = false;
  let host = false;
  const leaders = [];
  if (isLoaded) {
    for (let key of Object.keys(members)) {
      if (currentUser.id == key) groupMember = true;
    }
    allMembers = Object.values(members);
    // allMembers.forEach(
    //   (member) => (isMember = member.id === currentUser.id ? true : false)
    // );
    allMembers.forEach((member) => {
      if (
        member.Memberships[0].status === "co-host" ||
        member.Memberships[0].status === "host"
      ) {
        leaders.push(member);
      }
    });

    // console.log(allMembers, "------", currentUser);
    if (currentUser.id === group.organizerId) host = true;

    // let memberWithoutPending = allMembers.filter(
    //   (member) => member.Memberships[0].status !== "pending"
    // );

    // pending =
    //   allMembers.filter(
    //     (member) =>
    //       member.Memberships[0].status === "pending" &&
    //       member.id === currentUser.id
    //   ).length > 0
    //     ? true
    //     : false;

    // allMembers = host ? allMembers : memberWithoutPending;
  }

  // console.log("all member and current status", allMembers, currentUser);
  // get the leader
  // console.log("is member----", currentUser.id === group.organizerId);
  // console.log("leader!!!!!-----", leaders);
  let isEvent = false;
  if (!events) isEvent = true;

  return (
    isLoaded && (
      <>
        <div className="group-details-container">
          <div className="group-details-body">
            <div className="group-detail-page">
              <div className="top-detail">
                <div className="group-detail-image flex-grow-three">
                  <img
                    src={`${group.GroupImages[0].url}`}
                    className="group-detail-img"
                  />
                </div>
                <div className="group-detail flex-grow-two">
                  <h1 className="group-detial-name">{group.name}</h1>
                  <p className="group-detail-location">
                    {group.city}, {group.state}
                  </p>
                  <p className="group-detail-type">
                    {group.numMembers} members{" "}
                    {group.private === true ? "Private" : "Public"} group
                  </p>
                  <p className="group-detail-host">
                    Organized by{" "}
                    <span className="group-detail-firstname">
                      {group.Organizer.firstName} {group.Organizer.lastName[0]}.
                    </span>
                  </p>
                </div>
              </div>
              {/* <p>
          Organizer: {group.Organizer?.lastName}, {group.Organizer?.firstName}
        </p> */}
            </div>
            {/* <div className="group-detail-middle-bar-container"> */}
          </div>
          <div className="middle-bar-container">
            <div className="margin-auto">
              <div className="group-detail-middle-bar">
                <div className="group-detail-middle-bar-left">
                  <ul className="middle-bar">
                    <li>
                      <button
                        className="button-about"
                        onClick={() => {
                          setEvents(false);
                          setAbout(true);
                          setAllMembers(false);
                          setMembers(false);
                        }}
                      >
                        About
                      </button>
                    </li>
                    <li>
                      <button
                        className="button-events button-details"
                        onClick={() => {
                          setEvents(true);
                          setAbout(false);
                          setAllMembers(false);
                          setMembers(false);
                        }}
                      >
                        Events
                      </button>
                    </li>
                    <li>
                      <button
                        className="button-events button-details"
                        onClick={() => {
                          setEvents(false);
                          setAbout(false);
                          setMembers(true);
                          setAllMembers(true);
                        }}
                      >
                        Members
                      </button>
                    </li>

                    {/* {currentUser && currentUser.id === group.organizerId && ( */}
                    {host && (
                      <li>
                        {/* <> */}
                        <Link
                          className="edit-group"
                          to={`/groups/current/${groupId}/edit`}
                        >
                          Edit
                        </Link>
                        {/* <button onClick={handleDelete}>Delete</button>
              </> */}
                        {/* <span className="button-members button-details">Members</span> */}
                      </li>
                    )}
                    {/* {currentUser && currentUser.id === group.organizerId && ( */}
                    {host && (
                      <li>
                        {/* // <> */}
                        {/* <Link to={`/groups/current/${groupId}/edit`}>Edit</Link> */}
                        <button
                          onClick={handleDelete}
                          className="group-detail-delete-button"
                        >
                          Delete
                        </button>
                        {/* </> */}
                      </li>
                    )}
                    {/* <span className="button-photos  button-details">Photots</span> */}
                    {/* <li>
                <span className="button-discussion button-details">
                  Discussion
                </span>
              </li>
              <li>
                <span className="button-more button-details">More</span>
              </li> */}
                    {!groupMember && !host && (
                      <li>
                        <button
                          className="request-to-join"
                          onClick={handleJoinGroup}
                        >
                          Request to Join
                        </button>
                      </li>
                    )}
                    {groupMember && (
                      <li>
                        <button className="request-to-join">
                          Leave the group
                        </button>
                      </li>
                    )}
                    {!groupMember && pending === "pending" && (
                      <li>
                        <button
                          className="request-to-join"
                          onClick={handleJoinGroup}
                        >
                          Request is pending
                        </button>
                      </li>
                    )}
                  </ul>
                </div>

                {/* <div className="group-detail-middle-bar-right">
                  
                </div> */}
              </div>
            </div>
          </div>

          <div className="group-detail-hidden-container">
            <div className="group-detail-hidden">
              {showAbout && (
                <div className="group-detail-hidden-about">
                  <div className="group-detail-left flex-grow-one">
                    <div className="group-detail-about">
                      <h2>
                        <span>What we're about</span>
                      </h2>
                      <div>
                        <p>{group?.about}</p>
                      </div>
                    </div>
                  </div>
                  <div className="group-detail-right flex-grow-two">
                    <h3 className="group-detail-organizer">Organizer</h3>
                    <p className="organizer-first-name">
                      {group?.Organizer.firstName}
                    </p>
                  </div>
                </div>
              )}

              {showEvents && (
                <div className="group-detail-hidden-events">
                  {/* <div className="hidden-events-left"> */}
                  <div className="hidden-events-top">
                    <h3>Incoming events:</h3>
                    <div className="hidden-events-link">
                      {currentUser && currentUser.id === group.organizerId && (
                        <Link
                          className="hidden-events-link-text"
                          to={`/events/group/${group.id}/new`}
                        >
                          Create new event
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="all-events-group-detail">
                    {events?.map((event) => (
                      <div key={event.id} className="event-detail-group-detail">
                        {/* <Link to={`/events/${event.id}`}> */}
                        <div className="events-show">
                          <div className="events-show-pics">
                            <img src={event?.previewImage} />
                          </div>
                          <div className="events-show-details">
                            <h2>{event.name}</h2>
                            <p className="event-city">{event.Venue?.city}</p>
                            <div className="events-details-link">
                              click
                              <Link
                                className="events-details-link-text"
                                to={`/events/${event.id}`}
                              >
                                {" "}
                                here{" "}
                              </Link>
                              to see more details
                            </div>
                          </div>
                        </div>
                        {/* </Link> */}
                      </div>
                    ))}
                  </div>

                  {showEvents && events.length === 0 && (
                    <>
                      <p>There is no event in this group yet</p>
                    </>
                  )}
                </div>
              )}

              {showMembers && (
                <div className="group-detail-members">
                  <div className="flex flex-row">
                    <div className="flex flex-column sticky-member">
                      <nav className="padding-left-top-bottom">
                        <ul>
                          <li>
                            <div className="flex member-number">
                              <button
                                className="all-members"
                                onClick={() => {
                                  setAllMembers(true);
                                  setLeader(false);
                                }}
                              >
                                All members
                              </button>
                              <p>{allMembers.length}</p>
                            </div>
                          </li>
                          <li>
                            <div className="flex member-number">
                              <button
                                className="leadership"
                                onClick={() => {
                                  setAllMembers(false);
                                  setLeader(true);
                                }}
                              >
                                Leadership team
                              </button>
                              <p>{leaders.length}</p>
                            </div>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="member-right">
                      {/* {currentUser &&
                        currentUser.id === group.organizerId && */}
                      {(host || groupMember) && showAllMembers && (
                        <ul className="flex flex-column member-right-detail">
                          {allMembers.map((member) => (
                            <li key={member.id} className="member-name">
                              {/* <div className="member-name"> */}
                              <div
                                className="member-image"
                                style={{
                                  backgroundColor: getRandomColor(),
                                }}
                              >
                                <span>
                                  {member.firstName[0]}
                                  {member.lastName[0]}
                                </span>
                              </div>
                              <div className="member-status">
                                <span>
                                  {member.firstName} {member.lastName}
                                </span>
                                <p>{member.Memberships[0].status}</p>
                              </div>
                              {/* </div> */}
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* {(!currentUser || currentUser.id !== group.organizerId) && */}
                      {!groupMember && !host && (showAllMembers || showLeader) && (
                        <div className="flex flex-column no-current-user">
                          <div className="member-right-icon">
                            <i className="fa-solid fa-user-lock" />
                          </div>
                          <div className="member-right-text">
                            <h1>This content is available only to members</h1>
                            <span>
                              You can still join the group to learn more
                            </span>
                          </div>
                        </div>
                      )}
                      {/* {currentUser &&
                        currentUser.id === group.organizerId && */}
                      {(groupMember || host) && showLeader && (
                        <ul className="flex flex-column member-right-detail">
                          {leaders.map((leader) => (
                            <li key={leader.id} className="member-name">
                              {/* <div className="member-name"> */}
                              <div
                                className="member-image"
                                style={{
                                  backgroundColor: getRandomColor(),
                                }}
                              >
                                <span>
                                  {leader.firstName[0]}
                                  {leader.lastName[0]}
                                </span>
                              </div>
                              <div className="member-status">
                                <span>
                                  {leader.firstName} {leader.lastName}
                                </span>
                                <p>{leader.Memberships[0].status}</p>
                              </div>
                              {/* </div> */}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default GroupDetails;
