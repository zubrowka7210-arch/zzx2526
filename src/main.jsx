import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import MainPage from "./pages/MainPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import BerlinPage from "./pages/BerlinPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/home" element={<App />} />
      <Route path="/project/:pageId" element={<ProjectPage />} />
      <Route path="/berlin" element={<BerlinPage />} />
      <Route path="/detail/:pageId" element={<DetailPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </BrowserRouter>,
);
