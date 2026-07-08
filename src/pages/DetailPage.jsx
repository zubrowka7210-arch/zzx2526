import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import DetailLeftSection from "../components/DetailLeftSection.jsx";
import DetailRightSection from "../components/DetailRightSection.jsx";
import DetailCard from "../components/DetailCard.jsx";
import Grainient from "../components/Grainient.jsx";
import { getDetailPageData } from "../data/detailPageData.js";

function ImageFullscreen({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const hasMultipleImages = images.length > 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
      >
        ✕
      </button>

      <div className="relative w-full h-full flex items-center justify-center p-12 md:p-16">
        {hasMultipleImages && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
            >
              ←
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
            >
              →
            </button>
          </>
        )}

        <img
          src={images[currentIndex]}
          alt="Fullscreen image"
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// 每个页面的 Grainient 动效颜色配置
const PAGE_GRAINIENT_CONFIG = [
  {
    color1: "#9dd0f0",
    color2: "#c6e2e7",
    color3: "#8cedcc",
  },
  {
    color1: "#e8d79f",
    color2: "#c6e0e7",
    color3: "#99dcb1",
  },
  {
    color1: "#eaabca",
    color2: "#f4ecf5",
    color3: "#a5b8d8",
  },
];

export default function DetailPage() {
  const { pageId } = useParams();
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const scrollContainerRef = useRef(null);
  const [fullscreenImages, setFullscreenImages] = useState(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const handleOpenFullscreen = (images, index) => {
    setFullscreenImages(images);
    setFullscreenIndex(index);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImages(null);
  };

  const pageData = getDetailPageData(pageId || "page01");

  // 根据 pageId 计算对应的 pageIndex 和颜色
  const pageIndex =
    {
      page01: 0,
      page02: 1,
      page03: 2,
    }[pageId] || 0;

  const grainientConfig = PAGE_GRAINIENT_CONFIG[pageIndex];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const spacerCount = pageData.cards.filter(card => card.isSpacer).length;
      const spacerHeight = spacerCount * (window.innerHeight * 0.3);
      const scrollHeight =
        scrollContainer.scrollHeight - scrollContainer.clientHeight - spacerHeight;

      if (scrollHeight > 0) {
        const percentage = Math.round(Math.min((scrollTop / scrollHeight) * 100, 100));
        setScrollPercentage(percentage);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [pageData.cards]);

  return (
    <>
      <div
        className="w-full min-h-screen relative flex flex-col p-4 md:px-10 md:pt-16 md:pb-4 select-none"
        style={{
          fontFamily: '"Inter", sans-serif',
          color: "#1c1917",
        }}
      >
        <div className="absolute inset-0 z-0">
          <Grainient         
            color1={grainientConfig.color1}
            color2={grainientConfig.color2}
            color3={grainientConfig.color3}
            timeSpeed={0.25}
            colorBalance={0.0}
            warpStrength={1.0}
            warpFrequency={5.0}
            warpSpeed={2.0}
            warpAmplitude={50.0}
            blendAngle={0.0}
            blendSoftness={0.05}
            rotationAmount={500.0}
            noiseScale={2.0}
            grainAmount={0.1}
            grainScale={2.0}
            grainAnimated={false}
            contrast={1.5}
            gamma={1.0}
            saturation={1.0}
            centerX={0.0}
            centerY={0.0}
            zoom={0.9}
          />
        </div>
        <Navbar />

        <main 
          ref={scrollContainerRef}
          className="w-full flex-1 flex flex-col md:flex-row justify-between items-stretch my-6 relative z-10 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            main::-webkit-scrollbar { display: none; }
          `}</style>

          <DetailLeftSection
            title={pageData.title}
            description={pageData.description}
            scrollPercentage={scrollPercentage}
            pageIndex={pageIndex}
            tags={pageData.tags}
          />

          <div className="w-full md:w-2/4 flex flex-col my-auto z-10 py-4 space-y-12 px-2">
            {pageData.cards.map((card, index) => (
              <DetailCard key={index} card={card} onOpenFullscreen={handleOpenFullscreen} />
            ))}
          </div>

          <DetailRightSection
            projectNumber={pageData.projectNumber}
            totalProjects={pageData.totalProjects}
            role={pageData.role}
            agency={pageData.agency}
            year={pageData.year}
            awards={pageData.awards}
            portrait={pageData.portrait}
          />
        </main>
      </div>

      {fullscreenImages && (
        <ImageFullscreen
          images={fullscreenImages}
          initialIndex={fullscreenIndex}
          onClose={handleCloseFullscreen}
        />
      )}
    </>
  );
}
