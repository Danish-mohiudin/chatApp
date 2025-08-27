import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {logoutUserThunk} from "../../store/slice/user/userThunk";

function profilePopUp() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const {userProfile } = useSelector((state) => state.userReducer);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  return (
     <div>
      <div className="flex items-center justify-between p-3 border-t border-t-white/10">
        <div className="avatar flex items-center gap-4 text-sm">
          <div className="w-10 rounded-4xl flex">
            <img src={userProfile?.profile} 
             onClick={()=>{setOpen(true)}}
            />
          </div>
          <h2>{userProfile?.username}</h2>
        </div>
        <button onClick={handleLogout} className="btn btn-primary btn-sm px-4">
          logout
        </button>
      </div>


      {/* Profile Sliding Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#130f0f] text-white shadow-xl z-50 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex flex-col items-center">
            <img
              src={userProfile?.profile}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold mb-1">{userProfile?.fullName}</h2>
            <p className="text-sm text-gray-400 mb-4 text-center">
              Bio.....
            </p>
            <p className="text-sm mb-6">Mobile Number</p>
            <p className="text-sm mb-6">{userProfile?.username}</p>
            <button
              onClick={() => setOpen(false)}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
            >
              close
            </button>
            <p className='text-sm mt-4'>Edit Option will be availabe soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profilePopUp