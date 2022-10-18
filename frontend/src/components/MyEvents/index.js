// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getEventByGroup } from "../../store/event";
// import { getGroupById } from "../../store/group";

// const MyEvents = () => {
//   const { groupId } = useParams();
//   const group = useSelector((state) => state.group);
//   console.log("here is all groups in MyEvents component", group);
//   const events = useSelector((state) => state.event);
//   //   const currentUser = useSelector((state) => state.session.user);
//   //   const credential = currentUser.id === group.organizerId;

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getGroupById(groupId));
//     dispatch(getEventByGroup(groupId));
//   }, [dispatch]);

//   console.log("here is all events in MyEvents component", events);

//   if (!events) return null;
//   //   if (!events.length > 0 && credential)
//   //     return (
//   //       <>
//   //         <p>This group does not have any event yet.</p>
//   //         <Link to={`/events/group/${groupId}//new`}>
//   //           Go to create your first event!
//   //         </Link>
//   //       </>
//   //     );
//   //   else if (!events.length > 0)
//   //     return <p>There is no event in this group yet</p>;

//   return (
//     <>
//       <h2>Here are all the events</h2>
//     </>
//   );
// };

// export default MyEvents;
