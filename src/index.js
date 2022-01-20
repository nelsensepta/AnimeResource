import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import FavoritesContextProvider from "./context/FavoritesContext";
import "./i18n";

ReactDOM.render(
  <Suspense fallback={<div>Loading</div>}>
    <React.StrictMode>
      <BrowserRouter>
        <FavoritesContextProvider>
          <App />
        </FavoritesContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);
