import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppWithDeclarativeModeRouter from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithDeclarativeModeRouter />
  </StrictMode>,
);
