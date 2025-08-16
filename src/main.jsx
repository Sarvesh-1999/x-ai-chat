import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./router/Router";
import { MessageProvider } from "./context/MessageContext";

createRoot(document.getElementById("root")).render(
  <MessageProvider>
    <RouterProvider router={myRoutes} />
  </MessageProvider>
);
