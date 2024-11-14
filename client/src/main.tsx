import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter, BrowserRouter } from "react-router-dom";
import { RedirectProvider } from "./context/loaderRedirectContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RedirectProvider>
        <App />
      </RedirectProvider>
    </BrowserRouter>
  </React.StrictMode>
);
