import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import BlurText from "../components/BlurText";
import Grainient from "../components/Grainient";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  const navigate = useNavigate();
  const isTransitioning = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning.current) return;
      
      if (e.deltaY > 50) {
        isTransitioning.current = true;
        navigate("/berlin");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [navigate]);

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans" style={{ fontFamily: '"Inter", sans-serif', color: "#1c1917" }}>
      <div className="absolute inset-0">
        <Grainient
          color1="#83a1ff"
          color2="#e7ace8"
          color3="#e5e0b0"
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

      <div className="absolute inset-0 z-10">
        <img
          src="/about/bg.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <Navbar />

      <div className="relative z-20 w-full h-full flex flex-col pt-4">
        <div className="flex-1 flex flex-col justify-center px-8 md:px-24 mt-[-300px]">
          <BlurText
            text="ABOUT"
            delay={150}
            animateBy="letters"
            direction="bottom"
            className="text-[clamp(6rem,15vw,15rem)] text-stone-700 leading-[0.9] tracking-[0.1em]"
            style={{ fontFamily: '"MFZhuoYingNoncommercial", serif', fontWeight: '400' }}
          />
          <BlurText
            text="周子荀"
            delay={150}
            animateBy="letters"
            direction="bottom"
            className="text-[clamp(5rem,12vw,12rem)] text-stone-700 leading-[0.9] tracking-[-0.11em]"
            style={{ fontFamily: '"MFZhuoYingNoncommercial", serif', fontWeight: '400' }}
          />
        </div>

        <div className="flex justify-end pb-8 px-8 md:px-12 -translate-y-6">
          <Link
            to="/home"
            className="inline-flex items-center space-x-3 border border-stone-900 rounded-full px-6 py-2.5 text-sm uppercase font-medium tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
          >
            PROJECTS
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
