import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AdminPanel from "./AdminPanel";
import { Analytics } from "@vercel/analytics/react";

const isAdmin = window.location.pathname === "/admin" || window.location.pathname === "/admin/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdmin ? <AdminPanel /> : <App />}
    <Analytics />
  </React.StrictMode>
);
