import { Link } from "react-router-dom";
import { LetterSwapPingPong } from "./LetterSwap.jsx";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 w-full flex justify-between items-start text-xs font-medium tracking-wider uppercase p-6 md:p-12 md:py-7 pointer-events-auto z-50">
      <div className="flex items-center space-x-6">
        <Link to="/" className="border border-stone-600 px-1.5 py-0.5 text-stone-600 hover:text-stone-900 hover:border-stone-900 transition-colors">
          周 子 荀 作 品 集
        </Link>
      </div>
      <div className="flex items-center space-x-8">
        <nav className="space-x-4">
          <Link to="/berlin" className="text-stone-600 hover:text-stone-900 transition-colors">
            <span className="text-xs font-medium tracking-wider uppercase">PROJECT</span>
          </Link>
          <span className="text-stone-300">|</span>
          <Link to="/about" className="text-stone-600 hover:text-stone-900 transition-colors">
            <span className="text-xs font-medium tracking-wider uppercase">ABOUT</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
