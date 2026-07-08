import { Link } from "react-router-dom";
import { LetterSwapPingPong } from "./LetterSwap.jsx";

export default function DetailLeftSection({
  title,
  description,
  scrollPercentage,
  pageIndex,
  tags,
}) {
  return (
    <div className="w-full md:w-1/4 flex flex-col justify-between py-4 z-20">
      <div className="mt-4">
        <h1
          className="text-5xl font-medium leading-[0.85] tracking-tighter italic"
          style={{ letterSpacing: "-0.05em" }}
        >
          {title[0]}
        </h1>
        <h1
          className="text-5xl font-medium leading-[0.85] tracking-tighter italic mt-1 pl-1"
          style={{ letterSpacing: "-0.05em" }}
        >
          {title[1]}
        </h1>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-[10px] text-stone-600 font-medium tracking-wider uppercase px-3 py-1 border border-stone-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-[12px] text-stone-600 max-w-[200px] leading-relaxed mt-8 font-normal">
          {description}
        </p>
        <Link
          to={`/home?page=${pageIndex}`}
          className="inline-flex items-center space-x-6 border border-stone-900 rounded-full px-4 py-1.5 text-[11px] uppercase font-medium tracking-wider mt-6 hover:bg-stone-900 hover:text-white transition-colors"
        >
          <LetterSwapPingPong
            label="BACK ←"
            className="text-[11px] uppercase font-medium tracking-wider"
          />
        </Link>
      </div>

    </div>
  );
}

export function ProgressCircle({ scrollPercentage }) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 left-8 md:bottom-12 md:left-12 z-50">
      <div 
        className={`w-36 h-36 border border-stone-300 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:border-stone-400 ${
          scrollPercentage === 100 ? 'hover:bg-stone-100/50' : ''
        }`}
        onClick={scrollPercentage === 100 ? handleScrollToTop : undefined}
      >
        {scrollPercentage === 100 ? (
          <div className="flex flex-col items-center">
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-stone-600 transition-transform duration-300 hover:-translate-y-1"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
            <span className="text-[10px] text-stone-500 mt-1 tracking-wider uppercase">TOP</span>
          </div>
        ) : (
          <span className="text-4xl font-light tracking-tighter">
            {scrollPercentage}%
          </span>
        )}
      </div>
    </div>
  );
}
