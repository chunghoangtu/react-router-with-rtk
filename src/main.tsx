import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// import AppWithDeclarativeModeRouter from "@/app/declarative/AppWithDeclarativeModeRouter";
import AppWithDataModeRouter from "@/app/data/AppWithDataModeRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <AppWithDeclarativeModeRouter /> */}
    <AppWithDataModeRouter />
  </StrictMode>,
);
