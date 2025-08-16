import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NewChatPage from "../components/NewChatPage/NewChatPage";
import PastConversations from "../components/PastConversations/PastConversations";

export const myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <NewChatPage />
            },
            {
                path: "/history",
                element: <PastConversations />
            }
        ]
    }
])