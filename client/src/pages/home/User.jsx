import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setSelectedUser } from '../../store/slice/user/userSlice'
import {useNavigate } from 'react-router-dom';

function User({userDetails}) {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { selectedUser } = useSelector((state) => state.userReducer)
  const {onlineUsers} = useSelector((state) => state.socketReducer)
  
  const isUserOnline = onlineUsers?.includes(userDetails?._id)
  
  

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails))

    if (window.innerWidth < 768) {
      navigate('message-container')
    }
  };

  // selected user
  return (
    <div
    onClick={handleUserClick}
    className={`flex gap-5 items-center hover:bg-gray-700 rounded-lg py-1 px-2 cursor-pointer
    ${userDetails?._id === selectedUser?._id && 'bg-gray-700'}`}
  >
    <div className="relative w-12 h-12 rounded-full">
      <img
        src={userDetails?.profile}
        alt={userDetails?.fullName}
        className="w-full h-full object-cover"
      />

      {isUserOnline && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      )}
    </div>

    <div>
      <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
      <p className="text-xs">{userDetails?.username}</p>
    </div>
  </div>
  )
}

export default User