import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No element with id 'root' found");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);