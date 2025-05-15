import React from 'react'
import { IoSend } from "react-icons/io5";
import User from './User'
import Message from './Message'

function MessageContainer() {
  return (
    <div className='h-screen w-full flex flex-col'
    >
        <div className='p-3 border-b border-b-white/10'>
            <User />
        </div>



        <div className='h-full overflow-y-auto p-3'>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            

        </div>
         
        <div className='w-full p-3 flex gap-2'>
            <input type="text" placeholder="type here..." 
             class="input input-primary" />

            <button class="btn btn-square btn-outline btn-primary">
             <IoSend />
</button>
        </div>
    </div>
  )
}

export default MessageContainer