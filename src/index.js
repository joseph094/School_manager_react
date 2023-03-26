import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UpdatePassword />
  </React.StrictMode>
);
