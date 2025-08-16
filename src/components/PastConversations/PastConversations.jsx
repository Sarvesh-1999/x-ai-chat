import React, { useEffect, useState } from "react";
import aiIcon from "../../assets/aiIcon.png";
import userIcon from "../../assets/userIcon.png";
import likeAndDislikeIcon from "../../assets/likeAndDislike.png";

const PastConversations = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("pastConversations");
    setMessages(saved ? JSON.parse(saved) : []);
  }, []);

  // Group messages into conversations (pairs of user and AI)
  const conversations = [];
  for (let i = 0; i < messages.length; i += 2) {
    const userMsg = messages[i];
    const aiMsg = messages[i + 1];
    if (userMsg && aiMsg) {
      conversations.push({ userMsg, aiMsg });
    }
  }

  return (
    <div className="p-8 bg-[#F5F2FA] max-h-screen w-full overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Conversation History
      </h1>
      <h2 className="text-xl font-semibold mb-4">Today's Chats</h2>
      {conversations.length === 0 ? (
        <p className="text-center text-gray-500">
          No past conversations found.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {conversations.map(({ userMsg, aiMsg }, idx) => {
            console.log(aiMsg);

            return (
              <div key={idx} className="bg-[#BFA6E6] rounded-2xl p-6">
                <div className="flex  items-center gap-3 mb-2">
                  <img src={userIcon} className="w-10 h-10 rounded-full" />
                  <div>
                    <span className="font-bold">You</span>
                    <p className="font-normal text-[16px]">{userMsg.text}</p>
                    <span className="text-[12px] font-normal text-[#0000009E]">
                      {userMsg.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex  items-center gap-3 mb-2">
                  <img src={aiIcon} className="w-10 h-10 rounded-full" />
                  <div>
                    <span className="font-bold">Soul AI</span>
                    <p className="font-normal text-[16px]">{aiMsg.text}</p>
                    <span className="text-[12px] font-normal text-[#0000009E]">
                      {aiMsg.timestamp}
                    </span>
                  </div>
                </div>

                {aiMsg.liked ? (
                  <>
                   <div className="mt-1">★★★☆☆</div>
                    <div className="mt-2">
                      <span className="font-semibold">Feedback:</span> Not a good
                      experience
                    </div>
                  </>
                ) : (
                  <div className="flex gap-4 items-center">
                     <span className="text-[12px] font-normal text-[#0000009E]">
                        {aiMsg.timestamp}
                      </span>

                    <span className="flex gap-2 items-center">
                      <button >
                        <img
                          src={likeAndDislikeIcon}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </button>

                      <button >
                        <img
                          src={likeAndDislikeIcon}
                          className="w-4 h-4 rotate-180 cursor-pointer"
                        />
                      </button>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PastConversations;

//  <>
//                    
//                   </>
