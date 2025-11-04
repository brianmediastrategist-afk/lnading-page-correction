import { useState } from "react";

interface Logo {
  name: string;
  url: string;
}

interface LogoCarouselProps {
  logos: Logo[];
  title: string;
  direction?: "left" | "right";
  duration?: number; // seconds
}

export default function LogoCarousel({ logos, title, direction = "left", duration = 10 }: LogoCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);

  const headClones = logos.slice(-3);
  const tailClones = logos.slice(0, 3);
  const displayLogos = [...headClones, ...logos, ...logos, ...tailClones];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-secondary uppercase tracking-wide">
        {title}
      </h3>

      <div
        className="relative overflow-hidden bg-white rounded-xl border border-secondary/10 py-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-12 px-12 transition-none`}
          style={{
            animation: isPaused ? "none" : `${direction === "left" ? "scrollLeft" : "scrollRight"} ${duration}s linear infinite`,
            willChange: "transform",
          }}
        >
          {displayLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex-shrink-0 h-16 flex items-center justify-center group cursor-pointer">
              <img
                src={logo.url}
                alt={logo.name}
                className="h-12 md:h-14 object-contain transition-all duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        @keyframes scrollRight {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(50%,0,0); }
        }
      `}</style>
    </div>
  );
}
