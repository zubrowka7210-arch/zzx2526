import { useState, useRef } from "react";
import LogoLoop from "./LogoLoop";

export default function DetailCard({ card, onOpenFullscreen }) {
  const images = card.images || [card.image];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const hasMultipleImages = images.length > 1;
  const isUIImages = images.some(img => img && img.includes('/other/UI/'));

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = () => {
    onOpenFullscreen(images, currentIndex);
  };

  const toggleAudio = () => {
    if (!card.audio) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (card.isSpacer) {
    return <div className="h-[30vh]" />;
  }

  const logoImages = images.map((src, index) => ({
    src,
    alt: `Image ${index + 1}`,
  }));

  return (
    <div className="space-y-4">
      {(card.title || card.description) && (
        <div className="px-2">
          {card.title && <h3 className="text-base font-medium text-stone-800 mb-1">{card.title}</h3>}
          {card.description && <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{card.description}</p>}
        </div>
      )}

      {images.length > 0 && hasMultipleImages && isUIImages && (
        <div 
          className="relative overflow-visible"
          onClick={openFullscreen}
        >
          <div className="w-full overflow-hidden">
            <LogoLoop
              logos={logoImages}
              speed={50}
              direction="left"
              logoHeight={500}
              gap={50}
              hoverSpeed={0}
            />
          </div>
          <div className="absolute top-4 right-4 z-10 opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-800 text-xs">
              全屏
            </div>
          </div>
        </div>
      )}

      {images.length > 0 && (!hasMultipleImages || !isUIImages) && (
        <div className="relative px-12">
          <div 
            className="w-full relative overflow-hidden shadow-sm flex-shrink-0 cursor-pointer"
            onClick={openFullscreen}
          >
            <img
              src={images[currentIndex]}
              alt="Card image"
              className="w-full h-auto object-contain"
            />
            <div className="absolute top-4 right-4 z-10 opacity-0 hover:opacity-100 transition-opacity duration-200">
              <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-800 text-xs">
                全屏
              </div>
            </div>
          </div>

          {hasMultipleImages && !isUIImages && (
            <>
              {currentIndex > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-800 hover:bg-white hover:scale-110 transition-all duration-200 z-20"
                >
                  ←
                </button>
              )}
              {currentIndex < images.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-800 hover:bg-white hover:scale-110 transition-all duration-200 z-20"
                >
                  →
                </button>
              )}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-stone-800 scale-125"
                        : "bg-stone-400 hover:bg-stone-600"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {card.audio && (
        <div className="px-2 flex items-center space-x-3">
          <button
            onClick={toggleAudio}
            className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-stone-700 transition-colors"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <div className="flex-1 h-1 bg-stone-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-stone-900 transition-all duration-100"
              style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%" }}
            />
          </div>
          <span className="text-[10px] text-stone-500">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <audio
            ref={audioRef}
            src={card.audio}
            onEnded={handleAudioEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
          />
        </div>
      )}
    </div>
  );
}
