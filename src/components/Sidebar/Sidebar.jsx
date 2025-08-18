import newChatIcon from "../../assets/newchatlogo.png";
import aiIcon from "../../assets/aiIcon.png";
import { Link } from "react-router-dom";
import { MessageContext } from "../../context/MessageContext";
import { useContext } from "react";

const Sidebar = () => {
  const { setCurrentMessages } = useContext(MessageContext);

  const handleNewChat = () => {
    setCurrentMessages([]);
  };

  return (
    <aside className="w-[208px] h-screen bg-white hidden sm:block ">
      <Link to="/">
        <div className="flex justify-evenly items-center h-12 bg-[#D7C7F4]">
          <div className="w-8 h-8  rounded-full flex items-center justify-center">
            <img src={aiIcon} className="w-6 h-6" alt="Soul AI Icon" />
          </div>
          <button
            type="button"
            className="font-normal cursor-pointer"
            onClick={handleNewChat}
          >
            New Chat
          </button>
          <img className="w-6 h-6" src={newChatIcon} alt="New Chat Icon" />
        </div>
      </Link>

      <Link to="/history">
        <div className="rounded-[10px] h-10 w-44 bg-[#D7C7F4] mx-auto my-2 flex items-center justify-center font-bold hover:bg-purple-400">
          Past Conversations
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
