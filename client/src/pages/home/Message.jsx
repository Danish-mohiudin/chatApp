import {useEffect} from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

function Message({messageDetails}) {

  const  messageREf = useRef(null);
  const {userProfile, seletedUser} = useSelector((state) => state.userReducer);

  useEffect(() => {
    if(messageREf.current) {
      messageREf.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageDetails]);

  return (
    <>
      <div 
      ref={messageREf}
      className={`chat ${
        userProfile?._id === messageDetails?.senderId 
          ? 'chat-start'
          :'chat-end'
          }`}> 
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                userProfile?._id === messageDetails?.senderId 
                  ? userProfile?.profile
                  : seletedUser?.profile
                }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">{messageDetails?.Message}</div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>


      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
      
    </>
  );
}

export default Message;
