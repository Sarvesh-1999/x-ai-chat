import hambugerIcon from "../../assets/hamburger.png";
import aiIcon from "../../assets/aiIcon.png";
import userIcon from "../../assets/userIcon.png";
import sampleData from "../../aiData/sampleData.json";
import QuestionCard from "../QuestionCard/QuestionCard";
import TextField from "../TextField/TextField";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../context/MessageContext";
import likeAndDislikeIcon from "../../assets/likeAndDislike.png";

const NewChatPage = () => {
  const [input, setInput] = useState("");
  const { messages, setMessages } = useContext(MessageContext);

  // const [messages, setMessages] = useState(() => {
  //   const saved = localStorage.getItem("pastConversations");
  //   return saved ? JSON.parse(saved) : [];
  // });

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

    // console.log(userMessage);

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
    };

    // console.log(aiMessage);

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    localStorage.setItem(
      "pastConversations",
      JSON.stringify([...messages, userMessage, aiMessage])
    );
    setInput("");
  }

  useEffect(() => {}, [messages]);

  console.log(messages);

  const handleLike = (messageId, isLike) => {
    setMessages((prev) => {
      const updated = prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              liked: isLike ? !msg.liked : false,
              disliked: isLike ? false : !msg.disliked,
            }
          : msg
      );
      localStorage.setItem("pastConversations", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <article className="h-screen w-[100%] overflow-y-scroll">
      <header className="flex items-center gap-2.5 px-5 sticky top-0 bg-[#F9FAFA]">
        <img src={hambugerIcon} className="block sm:hidden w-6 " />
        <h1 className="font-bold text-[28px] primary-font text-[#9785BA] ">
          Bot AI
        </h1>
      </header>

      <div className="flex flex-col justify-end  h-[90%]">
        {messages.length === 0 ? (
          <>
            <section className="flex justify-center mt-[100px]">
              <div className=" flex flex-col justify-center items-center gap-3 ">
                <h1 className="capitalize font-medium text-[28px]">
                  how can i help you today?
                </h1>
                <img src={aiIcon} className="" />
              </div>
            </section>

            <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center items-center">
              {sampleQuestions.map((question, index) => {
                return <QuestionCard key={index} card={question} />;
              })}
            </section>
          </>
        ) : (
          <div className=" max-h-[80vh] overflow-y-scroll scrollbar-hide p-5 relative">
            {messages.map((message, idx) => {
              return (
                <div
                  key={idx}
                  className="shadow my-2 min-h-[105px] rounded-2xl flex items-center gap-3 p-3 bg-[#D7C7F421]"
                >
                  <img
                    src={message.sender === "user" ? userIcon : aiIcon}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <span className="font-bold">
                      {message.sender === "user" ? "You" : "Soul AI"}
                    </span>
                    <p className="font-normal text-[16px]">{message.text}</p>

                    <div className="flex gap-4 items-center">
                      <span className="text-[12px] font-normal text-[#0000009E]">
                        {message.timestamp}
                      </span>

                      {message.sender === "ai" && (
                        <span className="flex gap-2 items-center">
                          <button onClick={() => handleLike(message.id, true)}>
                            <img
                              src={likeAndDislikeIcon}
                              className="w-4 h-4 cursor-pointer"
                            />
                          </button>

                          <button onClick={() => handleLike(message.id, false)}>
                            <img
                              src={likeAndDislikeIcon}
                              className="w-4 h-4 rotate-180 cursor-pointer"
                            />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <TextField
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </article>
  );
};

export default NewChatPage;
