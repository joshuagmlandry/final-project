import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import { FilterProvider } from "./components/FilterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-oo3vgko2.us.auth0.com"
      clientId="eqAG8aIEB2DUvkCrSlaOohR0YhYD9a2r"
      redirectUri={window.location.origin}
    >
      <FilterProvider>
        <App />
      </FilterProvider>
    </Auth0Provider>
  </React.StrictMode>
);
