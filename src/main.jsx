import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./routes/Layout.jsx";
import CrashDetails from "./routes/CrashDetails.jsx";
import DeepDive from "./routes/DeepDive.jsx";
import RawData from "./routes/RawData.jsx";
import NotFound from "./components/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route element={<DeepDive />} path="deep-dive" />
          <Route element={<RawData />} path="raw-data" />

          <Route path="crash/:crash_id" element={<CrashDetails />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
