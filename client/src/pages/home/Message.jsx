import {useEffect, useRef} from "react";
import { useSelector } from "react-redux";

function Message({messageDetails}) {
  const  messageREf = useRef(null);
  const {userProfile, selectedUser} = useSelector((state) => state.userReducer);

  useEffect(() => {
    if(messageREf.current) {
      messageREf.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const time = new Date().toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
  });

  return (
    <>
      <div 
      ref={messageREf}
      className={`chat ${
        userProfile?._id === messageDetails?.senderId 
          ? 'chat-end'
          :'chat-start'
          }`}> 
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                userProfile?._id === messageDetails?.senderId 
                  ? userProfile?.profile
                  : selectedUser?.profile
                }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">{time}</time>
        </div>
        <div className="chat-bubble">{messageDetails?.message}</div>
      </div>
      
    </>
  );
}

export default Message;
