import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No element with id 'root' found");
}

const root = createRoot(rootElement);
root.render(
  <BrowserRouter> {/*The BrowserRouter is a special kind of component in React Router that wraps your application and makes it aware of the routing context.*/}
    <StrictMode>  {/*StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants.*/}
      <App />
    </StrictMode>
  </BrowserRouter>
);