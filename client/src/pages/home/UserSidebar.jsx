import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  logoutUserThunk,
} from "../../store/slice/user/userThunk";
import { useState } from "react";
import ProfilePopUp from './ProfilePopUp';

function UserSidebar() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);
  //console.log(userProfile);

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers || []);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return (
            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.fullName.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
      );
    }
  }, [searchValue, otherUsers]);

  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk());
    })();
  }, []);

  return (
    <>
    <div className="hidden sm:flex max-w-[20rem] w-full h-screen flex-col border-r border-r-white/10 bg-[#101010]">
      <h1 className="bg-black rounded-lg mt-3 mx-3 px-2 py-1 text-[#7480ff] text-xl font-semibold">
        THE CHAT
      </h1>

      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            required
            placeholder="Search"
          />
          <FaSearch />
        </label>
      </div>

      <div className="h-full overflow-y-auto px-3 flex flex-col gap-2">
        {users?.map((userDetails) => {
          return <User key={userDetails._id} userDetails={userDetails} />;
        })}
      </div>

      <ProfilePopUp />

    </div>

    {/* for mobile */}

    <div className="sm:hidden w-full h-screen flex flex-col border-r border-r-white/10 bg-[#101010]">
      <h1 className="bg-black rounded-lg mt-3 mx-3 px-2 py-1 text-[#7480ff] text-xl font-semibold">
        THE CHAT
      </h1>

      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            required
            placeholder="Search"
          />
          <FaSearch />
        </label>
      </div>

      <div className="h-full overflow-y-auto px-3 flex flex-col gap-2">
        {users?.map((userDetails) => {
          return <User key={userDetails._id} userDetails={userDetails} />;
        })}
      </div>

      <ProfilePopUp />

    </div>
    </>
  );
}

export default UserSidebar;
