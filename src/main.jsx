import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Lenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "./styles/global.css";

const App = lazy(() => import("./App.jsx"));
const MainPage = lazy(() => import("./pages/MainPage.jsx"));
const ProjectPage = lazy(() => import("./pages/ProjectPage.jsx"));
const BerlinPage = lazy(() => import("./pages/BerlinPage.jsx"));
const DetailPage = lazy(() => import("./pages/DetailPage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));

const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white">
    <div className="text-stone-400 text-sm tracking-wider">Loading...</div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Lenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, smoothTouch: true }}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<App />} />
          <Route path="/project/:pageId" element={<ProjectPage />} />
          <Route path="/berlin" element={<BerlinPage />} />
          <Route path="/detail/:pageId" element={<DetailPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </Lenis>
  </BrowserRouter>,
);
