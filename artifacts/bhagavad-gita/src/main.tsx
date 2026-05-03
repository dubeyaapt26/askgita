import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

const externalApiBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
if (externalApiBase) {
  setBaseUrl(externalApiBase);
}

createRoot(document.getElementById("root")!).render(<App />);
