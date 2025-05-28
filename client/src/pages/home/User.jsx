import React from 'react'
import { use } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setSelectedUser } from '../../store/slice/user/userSlice'

function User({userDetails}) {

  const dispatch = useDispatch()
  const { selectedUser } = useSelector((state) => state.userReducer)
  console.log(selectedUser);
  

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails))
  }
  return (
    <div onClick={handleUserClick} className={`flex gap-5 items-center hover:bg-gray-700 rounded-lg py-1 px-2 cursor-pointer
    ${userDetails?._id === selectedUser?._id && 'bg-gray-700'}`}>
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img src={userDetails?.profile} />
          </div>
        </div>
        <div>
            <h2 className='line-clamp-1'>{userDetails?.fullName}</h2>
            <p className='text-xs'>{userDetails?.username}</p>
        </div>
    </div>
  )
}

export default User