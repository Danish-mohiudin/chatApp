import MessageContainer from './MessageContainer'
import UserSidebar from './UserSidebar'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socketSlice'
import { setNewMessage } from '../../store/slice/message/messageSlice'
import { moveUserToTop } from '../../store/slice/user/userSlice'

const Home = () => {
  const { isAuthenticated, userProfile } = useSelector((state) => state.userReducer);
  const { socket } = useSelector((state) => state.socketReducer);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // ✅ Initialize socket on login
  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated, userProfile, dispatch]);

  // ✅ Socket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage));

      // ✅ figure out the "other user" in the conversation
      const otherUserId =
        newMessage.senderId === userProfile._id
          ? newMessage.recieverId
          : newMessage.senderId;

      dispatch(moveUserToTop(otherUserId));
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("newMessage");
    };
  }, [socket, dispatch, userProfile]);

  return (
    <>
      <div className="hidden sm:flex">
        <UserSidebar />
        <MessageContainer />
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden">
        <UserSidebar />
        {/* <MessageContainer /> */}
      </div>
    </>
  );
};

export default Home;
