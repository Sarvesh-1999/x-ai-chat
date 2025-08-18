import {createContext, useState} from 'react'

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("pastConversations");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentMessages, setCurrentMessages] = useState([]);
  
  return (
    <MessageContext.Provider value={{ 
      conversations, 
      setConversations, 
      currentMessages, 
      setCurrentMessages 
    }}>
      {children}
    </MessageContext.Provider>
  );
};

