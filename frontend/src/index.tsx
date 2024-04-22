import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import './index.css';

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