import {createContext, useState} from 'react'

export const MessageContext = createContext();

export const MessageProvider = ({children}) => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("pastConversations");
    return saved ? JSON.parse(saved) : [];
  });
  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  )
}

