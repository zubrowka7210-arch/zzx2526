import { Link } from "react-router-dom";
import Ferrofluid from "../components/Ferrofluid";

export default function HeroPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden overflow-y-hidden">
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <Ferrofluid 
          colors={["#89c8d9","#d090c1"]} 
          speed={0.1} 
          scale={2.9} 
          turbulence={0.45} 
          fluidity={0.13} 
          rimWidth={0.12} 
          sharpness={2.3} 
          shimmer={0.45} 
          glow={1.2} 
          flowDirection="down" 
          opacity={1} 
          mouseInteraction 
          mouseStrength={0.9} 
          mouseRadius={0.35}
          dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
        /> 
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0">
            <img
              src="/photo.jpg"
              alt="周子荀"
              className="w-40 h-auto object-contain rounded-lg shadow-md"
            />
          </div>

          <div className="flex-1 text-left">
            <h1 className="text-[58px] font-bold text-stone-900">
              周子荀
            </h1>

            <p className="mt-2 text-lg md:text-xl text-stone-600 font-medium">
              设计与智能科学交叉背景
            </p>

            <p className="mt-4 text-xs text-stone-700 leading-relaxed font-normal max-w-xl">
              本科阶段就读于西北大学智能科学与技术专业，硕士阶段进入华南理工大学设计学院设计学交叉学科方向。跨学科经历使我能够以工程师的思维判断技术可行性，以设计师的视角洞悉用户真实需求，在产品的构思与落地之间架起桥梁。目前的研究与实践聚焦于AIGC的产业赋能，致力于探索人工智能在文旅、文创等领域的创新应用与价值转化。
            </p>

            <div className="mt-6 flex flex-wrap gap-3 justify-start">
              <span className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded-full text-sm font-medium">
                AIGC产品设计
              </span>
              <span className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded-full text-sm font-medium">
                多模态系统设计
              </span>
              <span className="px-4 py-1.5 bg-stone-100 text-stone-700 rounded-full text-sm font-medium">
                文化IP策划与传播
              </span>
            </div>

            <div className="mt-6 text-sm text-stone-600">
              <p>电话：18559200715</p>
              <p className="mt-1">邮箱：1154611320@qq.com</p>
            </div>

            <div className="mt-8 flex justify-start">
              <Link
                to="/home"
                className="inline-flex items-center space-x-3 border border-stone-900 rounded-full px-6 py-2.5 text-sm uppercase font-medium tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
              >
                ENTER
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}