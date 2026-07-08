import { useParams, Link } from "react-router-dom";
import { LetterSwapPingPong } from "../components/LetterSwap.jsx";
import Navbar from "../components/Navbar.jsx";

const projectData = {
  page01: {
    title1: "河源文旅品牌",
    title2: "年轻化传播策划",
    description: "基于河源\"四小龙\"IP的整体文旅品牌年轻化传播策划方案，带领团队进行实地采风和问卷调查，提出人格化设计、潮流化表达、场景化渗透三层框架。",
    backgroundColor: "#f0cad7",
  },
  page02: {
    title1: "面向中国书画的",
    title2: "智能配乐系统",
    description: "让AI先读懂中国山水画，再决定该配什么样的音乐",
    backgroundColor: "#fff5f5",
  },
  page03: {
    title1: "其他作品",
    title2: "Other Works",
    description: "包括APP设计、工业设计作品、VR小游戏",
    backgroundColor: "#f5f7fa",
  },
  page04: {
    title1: "Darko Bratina",
    title2: "Design",
    description: "Darko Bratina设计作品集",
    backgroundColor: "#ffffff",
  },
};

export default function ProjectPage() {
  const { pageId } = useParams();
  const data = projectData[pageId] || projectData.page01;

  return (
    <div 
      className="w-full min-h-screen overflow-x-hidden font-sans" 
      style={{ 
        fontFamily: '"Inter", sans-serif', 
        color: "#1c1917",
        backgroundColor: data.backgroundColor
      }}
    >
      <Navbar />
      
      <main className="w-full min-h-screen flex flex-col items-center justify-center pb-24 px-4">
        <div className="relative max-w-4xl w-full">
          <div
            className="font-medium leading-[0.9] tracking-tighter text-left"
            style={{
              letterSpacing: "-0.04em",
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
            }}
          >
            {data.title1}
          </div>

          <div
            className="font-medium leading-[0.9] tracking-tighter text-right md:pr-12 mt-1"
            style={{
              letterSpacing: "-0.04em",
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
            }}
          >
            {data.title2}
          </div>
        </div>

        <div className="w-full max-w-2xl mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-6 sm:space-y-0">
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg leading-relaxed font-normal">
            {data.description}
          </p>
          <Link
            to={`/detail/${pageId}`}
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
