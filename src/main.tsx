import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode> {/* Commenté pour éviter le double rendu en développement */}
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  // </React.StrictMode>, {/* Commenté pour éviter le double rendu en développement */}
);
