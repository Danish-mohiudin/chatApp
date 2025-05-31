import MessageContainer from './MessageContainer'
import UserSidebar from './UserSidebar'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeSocket , setOnlineUsers} from '../../store/slice/socket/socketSlice'
import { setNewMessage } from '../../store/slice/message/messageSlice'
const Home = () => {

  const {isAuthenticated, userProfile} = useSelector((state) => state.userReducer);
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
    <div className='flex '>
      <UserSidebar />
      <MessageContainer />
    </div>
  )
}

export default Home