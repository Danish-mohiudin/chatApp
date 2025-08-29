import MessageContainer from './MessageContainer'
import UserSidebar from './UserSidebar'
//import ProfilePopUp from './ProfilePopUp'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeSocket , setOnlineUsers} from '../../store/slice/socket/socketSlice'
import { setNewMessage } from '../../store/slice/message/messageSlice'
const Home = () => {

  const {isAuthenticated, userProfile} = useSelector((state) => state.userReducer);
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id)); // create socket connection when user is authenticated
  },[isAuthenticated])


  const {socket} = useSelector(state => state.socketReducer);

  useEffect(()=>{
    if(!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      socket.on("newMessage", (newMessage) => {
        dispatch(setNewMessage(newMessage));
      });
      return () => {
        socket.close(); // clean up when component unmounts
      }
  },[socket])


  return (
    <>
    <div className='hidden sm:flex '>
      <UserSidebar />
      <MessageContainer />
    </div>

    {/* for mobile  */}
    <div className='flex'>
      <UserSidebar />
      {/* <MessageContainer /> */}
    </div>
    </>
  )
}

export default Home