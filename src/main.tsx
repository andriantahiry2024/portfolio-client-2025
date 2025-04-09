import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { registerServiceWorker } from "./serviceWorkerRegistration";

// Initialisation des outils de développement
if (import.meta.env.DEV) {
  import("tempo-devtools").then(({ TempoDevtools }) => {
    TempoDevtools.init();
  });
}

const basename = import.meta.env.BASE_URL;

// Supprimer le loader initial
const removeInitialLoader = () => {
  const initialLoader = document.querySelector('.initial-loader');
  if (initialLoader) {
    initialLoader.classList.add('fade-out');
    setTimeout(() => {
      initialLoader.remove();
    }, 500);
  }
};

// Rendu de l'application
const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  );

  // Supprimer le loader initial après un court délai
  setTimeout(removeInitialLoader, 100);

  // Enregistrer le service worker
  registerServiceWorker();
}
