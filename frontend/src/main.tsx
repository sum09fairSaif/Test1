import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App.tsx";
import "leaflet/dist/leaflet.css";

const auth0Domain = "dev-3e3n4mi7tokt4bpi.us.auth0.com";
const auth0ClientId = "AFWuJwwc7ORHRQB1rSY041R0teostGA1";

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={auth0Domain!}
    clientId={auth0ClientId!}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage"
    useRefreshTokens
  >
    {app}
  </Auth0Provider>,
);
