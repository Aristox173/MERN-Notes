import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Verifica que el clientId sea correcto y esté configurado en la consola de Google Cloud
const clientId = "824399605893-3cm92l8vv0uhgvdfvbk8r9bqjofghu5g.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId} >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);