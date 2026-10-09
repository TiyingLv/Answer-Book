import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AnswerBookProvider } from "./context/AnswerBookContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AnswerBookProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AnswerBookProvider>
  </React.StrictMode>,
);
