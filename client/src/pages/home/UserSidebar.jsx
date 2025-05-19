import React from 'react'
import { FaSearch } from "react-icons/fa";
import User from './User';

function UserSidebar() {
  return (
    <div className='max-w-[20rem] w-full h-screen flex flex-col border-r border-r-white/10'>

        <h1 className='bg-black rounded-lg mt-3 mx-3 px-2 py-1 text-[#7480ff] text-xl font-semibold'>
            THE CHAT</h1>

        <div className='p-3'>
            <label class="input">
                <FaSearch /> 
                <input type="search" required placeholder="Search" />
            </label>
        </div>

        <div className='h-full overflow-y-auto px-3'>
            <User />
            <User />
            
        </div>

        <div className='flex items-center justify-between p-3 border-t border-t-white/10'>
            <div class="avatar">
              <div class="w-10 rounded-4xl">
                  <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
              </div>
            </div>
            <button class="btn btn-primary btn-sm px-4">logout</button>

        </div>
    </div>
  )
}

export default UserSidebar