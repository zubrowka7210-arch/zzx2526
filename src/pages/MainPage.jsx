import { Link } from "react-router-dom";
import BlurText from "../components/BlurText";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AboutPage = lazy(() => import("./AboutPage"));

const PAGES = ["hero", "about"];
const TRANSITION_DURATION = 0.8;
const SCROLL_THRESHOLD = 100;
const SCROLL_COOLDOWN = 500;

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

export default function MainPage() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const total = PAGES.length;
  const isTransitioning = useRef(false);
  const lastScrollTime = useRef(0);
  const accumulatedDelta = useRef(0);

  const goNext = () => {
    if (isTransitioning.current || page >= total - 1) return;
    isTransitioning.current = true;
    setDirection(1);
    setPage((p) => p + 1);
    setTimeout(() => {
      isTransitioning.current = false;
    }, TRANSITION_DURATION * 1000);
  };

  const goPrev = () => {
    if (isTransitioning.current || page <= 0) return;
    isTransitioning.current = true;
    setDirection(-1);
    setPage((p) => p - 1);
    setTimeout(() => {
      isTransitioning.current = false;
    }, TRANSITION_DURATION * 1000);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now();
      if (
        isTransitioning.current ||
        now - lastScrollTime.current < SCROLL_COOLDOWN
      ) {
        return;
      }

      accumulatedDelta.current += e.deltaY;

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
  }, [page]);

  return (
    <div className="relative w-full overflow-x-hidden font-sans" style={{ fontFamily: '"Inter", sans-serif', color: "#1c1917" }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: TRANSITION_DURATION,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full h-screen"
        >
          {page === 0 && (
            <section className="relative w-full h-screen overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-800/30 to-stone-900/60" />
              
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoadedData={(e) => {
                  setVideoLoaded(true);
                  e.target.play().catch(() => {});
                }}
                onError={() => setVideoLoaded(true)}
              >
                <source src="/hero/背景视频.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-6 flex justify-between items-center">
                <div className="border border-white/50 px-4 py-2">
                  <span className="text-white text-sm tracking-wider font-medium">周子荀作品集</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/berlin"
                    className="text-white text-sm tracking-wider font-medium hover:opacity-70 transition-opacity"
                  >
                    PROJECT
                  </Link>
                  <span className="text-white/50">|</span>
                  <Link
                    to="/about"
                    className="text-white text-sm tracking-wider font-medium hover:opacity-70 transition-opacity"
                  >
                    ABOUT
                  </Link>
                </div>
              </div>

              <div className="h-screen flex flex-col items-center justify-center relative z-10 -mt-40">
                <BlurText
                  text="Portfolio"
                  delay={150}
                  animateBy="letters"
                  direction="bottom"
                  className="text-[clamp(8rem,25vw,20rem)] text-[#FFEAEA] leading-[1.5] tracking-[0.15em]"
                  style={{ fontFamily: '"MFZhuoYingNoncommercial", "HYQiHei", serif', fontWeight: 'normal' }}
                />

                <div 
                  className="-mt-16 text-white tracking-[0.4em]"
                  style={{ fontFamily: '"HYQiHei", serif', fontWeight: '500', fontSize: 'clamp(1.5rem, 4vw, 3rem)', lineHeight: '1.13', opacity: '0.9' }}
                >
                  2025-2026
                </div>

                <div 
                  className="mt-3 text-white/80 tracking-[0.1em]"
                  style={{ fontFamily: '"Times New Roman", Times, serif', fontWeight: '500', fontSize: '18px', lineHeight: '1.14', opacity: '0.9' }}
                >
                  IP-based brand rejuvenation | system integration | prompt design | APP design based on user experience | product design
                </div>
              </div>

              <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 text-white/60 text-sm animate-bounce cursor-pointer" onClick={goNext}>
                <span>↓</span>
              </div>
            </section>
          )}

          {page === 1 && (
            <Suspense fallback={<div className="text-stone-400">Loading...</div>}>
              <AboutPage />
            </Suspense>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
