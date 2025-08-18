import React, { useContext, useEffect, useState } from "react";
import aiIcon from "../../assets/aiIcon.png";
import userIcon from "../../assets/userIcon.png";
import likeAndDislikeIcon from "../../assets/likeAndDislike.png";
import { MessageContext } from "../../context/MessageContext";
import StarRating from "../StarRating/StarRating";

const PastConversations = () => {
  const { conversations } = useContext(MessageContext);
  const [filter, setFilter] = useState('all');

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'all') return true;
    const rating = parseInt(filter);
    return conv.messages.some(msg => msg.rating === rating);
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Conversation History
      </h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Filter by Rating:</label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <h2 className="text-xl font-semibold mb-4">Today's Chats</h2>
      
      {filteredConversations.length === 0 ? (
        <p className="text-center text-gray-500">
          No conversations found matching your criteria.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredConversations.map((conversation) => (
            <div key={conversation.id} className="bg-purple-200 rounded-2xl p-6">
              {conversation?.messages?.map((message, idx) => (
                <div key={idx} className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">
                      {message.sender === "user" ? "U" : "AI"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">
                      {message.sender === "user" ? "You" : "Soul AI"}
                    </span>
                    <p className="font-normal text-[16px]">{message.text}</p>
                    <span className="text-[12px] font-normal text-gray-600">
                      {message.timestamp}
                    </span>
                    
                    {message.sender === "ai" && message.rating > 0 && (
                      <div className="mt-2">
                        <StarRating rating={message.rating} readonly />
                        {message.feedback && (
                          <div className="mt-1">
                            <span className="font-semibold">Feedback:</span> {message.feedback}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PastConversations;

//  <>
//                    
//                   </>
