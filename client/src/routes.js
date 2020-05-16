import React from "react";
import Dashboard from "./components/Dashboard/dash";
import Chat from "./components/ChatBox/chat";

const routes = [
    {
      path: "/dashboard",
      exact: true,
      main: () => <Dashboard/>
    },
    {
      path: "/chat",
      main: () => <Chat/>
    },
    {
      path: "/shoelaces",
      main: () => <h2>Shoelaces</h2>
    }
  ]

export default routes;
