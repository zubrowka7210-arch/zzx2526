import { Link } from "react-router-dom";
import { LetterSwapPingPong } from "./LetterSwap.jsx";
import Grainient from "./Grainient.jsx";

export default function Page01() {
  return (
    <div className="relative w-full h-full min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#9dd0f0"
          color2="#c6e2e7"
          color3="#94e8ccff"
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

      <main className="w-full my-auto flex flex-col items-center relative z-10">
        <div className="relative max-w-4xl w-full px-4">
          <div
            className="font-medium leading-[0.9] tracking-tighter text-left"
            style={{
              letterSpacing: "-0.04em",
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
            }}
          >
            河源文旅品牌
          </div>

          <div
            className="font-medium leading-[0.9] tracking-tighter text-right md:pr-12 mt-1"
            style={{
              letterSpacing: "-0.04em",
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
            }}
          >
            年轻化传播策划
          </div>
        </div>

        <div className="w-full max-w-2xl mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 space-y-6 sm:space-y-0">
          <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed font-normal">
            基于河源"四小龙"IP的整体文旅品牌年轻化传播策划方案，带领团队进行实地采风和问卷调查，提出人格化设计、潮流化表达、场景化渗透三层框架。
          </p>
          <Link
            to="/detail/page01"
            className="flex items-center space-x-6 border border-stone-900 rounded-full px-5 py-2 text-xs uppercase font-medium tracking-wider hover:bg-stone-900 hover:text-white transition-colors"
          >
            <LetterSwapPingPong
              label="VISIT ↗"
              className="text-xs uppercase font-medium tracking-wider"
            />
          </Link>
        </div>
      </main>
    </div>
  );
}
