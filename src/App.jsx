import NewChatPage from './components/NewChatPage/NewChatPage'
import PastConversations from './components/PastConversations/PastConversations';
import Sidebar from './components/Sidebar/Sidebar'
import { MessageProvider } from './context/MessageContext';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <MessageProvider>
      <Router>
        <main className="h-screen w-full bg-gray-50 flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<NewChatPage />} />
            <Route path="/history" element={<PastConversations />} />
          </Routes>
        </main>
      </Router>
    </MessageProvider>
  );
};

export default App
