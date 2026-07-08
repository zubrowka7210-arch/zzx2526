import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Page01 from "./components/Page01.jsx";
import Page02 from "./components/Page02.jsx";
import Page03 from "./components/Page03.jsx";

const PAGES = [Page01, Page02, Page03];
const PAGE_IMAGES = [
  "./case1 heyuan/hy01.png",
  "./case2 music/花鸟.png",
  "./other/设计2-1.png",
];

const preloadImages = () => {
  PAGE_IMAGES.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// 每个页面的颜色配置
const PAGE_COLORS = [
  {
    color1: [245, 196, 128],
    color2: [208, 114, 137],
    backgroundColor: "#f0cad7",
  },
  {
    color1: [255, 182, 193],
    color2: [255, 218, 185],
    backgroundColor: "#fff5f5",
  },
  {
    color1: [24, 93, 87], // 迷雾蓝
    color2: [176, 196, 222], // 钢青
    backgroundColor: "#f5f7fa", // 浅岩灰
  },
];

const TRANSITION_DURATION = 0.8; // 秒
const SCROLL_THRESHOLD = 100; // 滚轮触发阈值（提高灵敏度）
const SCROLL_COOLDOWN = 500; // 滚轮冷却时间（毫秒）

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const pageTransition = {
  duration: TRANSITION_DURATION,
  ease: [0.22, 1, 0.36, 1],
};

export default function App() {
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "0", 10);
  const [page, setPage] = useState(
    Math.min(Math.max(initialPage, 0), PAGES.length - 1),
  );
  const [direction, setDirection] = useState(0); // 1: next, -1: prev
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const total = PAGES.length;
  const isTransitioning = useRef(false);
  const lastScrollTime = useRef(0);
  const accumulatedDelta = useRef(0);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = PAGE_IMAGES.length;
    
    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }
    
    PAGE_IMAGES.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  const goNext = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setDirection(1);
    setPage((p) => (p + 1) % total);
    setTimeout(() => {
      isTransitioning.current = false;
    }, TRANSITION_DURATION * 1000);
  };

  const goPrev = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setDirection(-1);
    setPage((p) => (p - 1 + total) % total);
    setTimeout(() => {
      isTransitioning.current = false;
    }, TRANSITION_DURATION * 1000);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now();

      // 如果正在过渡或冷却时间内，忽略滚动
      if (
        isTransitioning.current ||
        now - lastScrollTime.current < SCROLL_COOLDOWN
      ) {
        return;
      }

      // 累积滚动量
      accumulatedDelta.current += e.deltaY;

      // 检查是否达到阈值
      if (accumulatedDelta.current > SCROLL_THRESHOLD) {
        accumulatedDelta.current = 0;
        lastScrollTime.current = now;
        goNext();
      } else if (accumulatedDelta.current < -SCROLL_THRESHOLD) {
        accumulatedDelta.current = 0;
        lastScrollTime.current = now;
        goPrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const CurrentPage = PAGES[page];
  const currentColors = PAGE_COLORS[page];

  return (
    <>
      <div
        className="relative z-10 w-full min-h-screen overflow-x-hidden select-none font-sans"
        style={{ fontFamily: '"Inter", sans-serif', color: "#1c1917" }}
      >
        <Navbar />

        <main className="w-full min-h-screen flex flex-col items-center justify-center pb-24 relative">
          <AnimatePresence custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
            >
              <CurrentPage />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer
          current={page + 1}
          total={total}
          onPrev={goPrev}
          onNext={goNext}
          image={PAGE_IMAGES[page]}
        />
      </div>
    </>
  );
}
