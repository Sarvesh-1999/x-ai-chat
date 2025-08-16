import newChatIcon from "../../assets/newchatlogo.png";
import aiIcon from "../../assets/aiIcon.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-[208px] h-screen bg-white hidden sm:block">
      <div className="flex justify-evenly items-center h-12 bg-[#D7C7F4]">
        <img src={aiIcon} className="w-8 h-8" />
        <button className="primary-font font-normal">New Chat</button>
        <img src={newChatIcon} className="h-6 w-6" />
      </div>

      <Link to={"/history"}>
        <div className="rounded-[10px] h-10 w-44 bg-[#D7C7F4] mx-auto my-2 flex items-center justify-center font-bold primary-font">
          Past Conversations
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
