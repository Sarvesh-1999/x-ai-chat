import hambugerIcon from "../../assets/hamburger.png";
import aiIcon from "../../assets/aiIcon.png";
import userIcon from "../../assets/userIcon.png";
import sampleData from "../../aiData/sampleData.json";
import QuestionCard from "../QuestionCard/QuestionCard";
import TextField from "../TextField/TextField";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../context/MessageContext";
import likeAndDislikeIcon from "../../assets/likeAndDislike.png";
import StarRating from "../StarRating/StarRating"
import FeedbackModal from "../FeedbackModal/FeedbackModal"

const NewChatPage = () => {
  const [input, setInput] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessageId, setFeedbackMessageId] = useState(null);
  
  const { currentMessages, setCurrentMessages, conversations, setConversations } = useContext(MessageContext);

  const sampleQuestions = [
    {
      question: "Hi, what is the weather",
      description: "Get immediate AI generated response",
    },
    {
      question: "Hi, what is my location", 
      description: "Get immediate AI generated response",
    },
    {
      question: "Hi, what is the temperature",
      description: "Get immediate AI generated response",
    },
    {
      question: "Hi, how are you",
      description: "Get immediate AI generated response",
    },
  ];

  const handleQuestionClick = (question) => {
    setInput(question);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const aiResponse = sampleData.find(
      ({ question }) =>
        question.trim().toLowerCase() === trimmedInput.toLowerCase()
    );

    const aiMessage = {
      id: (Date.now() + 1).toString(),
      text: aiResponse
        ? aiResponse.response
        : "Sorry, Did not understand your query!",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      liked: null,
      disliked: null,
      rating: 0,
      feedback: ""
    };

    setCurrentMessages(prev => [...prev, userMessage, aiMessage]);
    // setConversations(prev => [...prev, userMessage, aiMessage]);

    // localStorage.setItem(
    //   "pastConversations",
    //   JSON.stringify([...currentMessages, userMessage, aiMessage])
    // );
    setInput("");
  }

  const handleLike = (messageId, isLike) => {
    setCurrentMessages(prev => 
      prev.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              liked: isLike ? !msg.liked : false,
              disliked: isLike ? false : !msg.disliked,
            }
          : msg
      )
    );
  };

  const handleFeedbackClick = (messageId) => {
    setFeedbackMessageId(messageId);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (messageId, rating, feedback) => {
    setCurrentMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, rating, feedback }
          : msg
      )
    );
  };

  const handleSave = () => {
    if (currentMessages.length === 0) return;
    
    const conversationId = Date.now().toString();
    const newConversation = {
      id: conversationId,
      messages: currentMessages,
      createdAt: new Date().toISOString(),
    };

    const updatedConversations = [...conversations, newConversation];
    setConversations(updatedConversations);
    localStorage.setItem("pastConversations", JSON.stringify(updatedConversations));
    
    // Clear current messages
    setCurrentMessages([]);
    alert("Conversation saved!");
  };

  return (
    <article className="h-screen w-[100%] overflow-y-scroll bg-gray-50">
      <header className="flex items-center gap-2.5 px-5 sticky top-0 bg-gray-50 py-3 ">
        <div className="block sm:hidden w-6 h-6 bg-gray-400 rounded"></div>
        <h1 className="font-bold text-[28px] text-[#9785BA]">
          Bot AI
        </h1>
      </header>

      <div className="flex flex-col justify-end h-[90%]">
        {currentMessages.length === 0 ? (
          <>
            <section className="flex justify-center mt-[100px]">
              <div className="flex flex-col justify-center items-center gap-3">
                <h1 className="capitalize font-medium text-[28px]">
                  How Can I Help You Today?
                </h1>
                <div className="w-16 h-16  rounded-full flex items-center justify-center">
                  <img src={aiIcon} alt=""  className="w-[69px] h-[69px] "/>
                </div>
              </div>
            </section>

            <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center items-center px-5">
              {sampleQuestions.map((question, index) => (
                <QuestionCard 
                  key={index} 
                  card={question} 
                  onClick={handleQuestionClick}
                />
              ))}
            </section>
          </>
        ) : (
          <div className="max-h-[80vh] overflow-y-scroll p-5">
            {currentMessages.map((message, idx) => (
              <div
                key={idx}
                className="shadow my-2 min-h-[105px] rounded-2xl flex items-start gap-3 p-3 bg-purple-50"
              >
                <div className="h-[69px] w-[69px]  rounded-full flex items-center justify-center flex-shrink-0">
                    {message.sender === "user" ? <img src={userIcon} className="h-[69px] w-[69px] rounded-full"/> : <img src={aiIcon} className="h-[69px] w-[69px] rounded-full"/>}
                </div>
                <div className="flex-grow">
                  <span className="font-bold">
                    {message.sender === "user" ? "You" : <span>Soul AI</span>}
                  </span>
                  <p className="font-normal text-[16px] mt-1">{message.text}</p>

                  <div className="flex gap-4 items-center mt-2">
                    <span className="text-[12px] font-normal text-gray-600">
                      {message.timestamp}
                    </span>

                    {message.sender === "ai" && (
                      <div className="flex gap-2 items-center">
                        <button 
                          onClick={() => handleLike(message.id, true)}
                          className={`p-1 rounded hover:bg-gray-200 ${message.liked ? 'text-green-500' : ''}`}
                        >
                          👍
                        </button>
                        <button 
                          onClick={() => handleLike(message.id, false)}
                          className={`p-1 rounded hover:bg-gray-200 ${message.disliked ? 'text-red-500' : ''}`}
                        >
                          👎
                        </button>
                        <button
                          onClick={() => handleFeedbackClick(message.id)}
                          className="px-2 py-1 text-xs bg-purple-200 rounded hover:bg-purple-300"
                        >
                          Feedback
                        </button>
                      </div>
                    )}
                  </div>

                  {message.rating > 0 && (
                    <div className="mt-2">
                      <StarRating rating={message.rating} readonly />
                      {message.feedback && (
                        <p className="text-sm text-gray-600 mt-1">"{message.feedback}"</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <TextField
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          onSave={handleSave}
        />
      </div>

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
        messageId={feedbackMessageId}
      />
    </article>
  );
};

export default NewChatPage;
