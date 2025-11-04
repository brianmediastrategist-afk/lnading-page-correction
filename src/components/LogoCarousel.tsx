interface Logo {
  name: string;
  url: string;
}

interface LogoCarouselProps {
  logos: Logo[];
  title: string;
  direction?: "left" | "right";
  duration?: number;
}

export default function LogoCarousel({ logos, title, direction = "left", duration = 30 }: LogoCarouselProps) {
  const displayLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-secondary uppercase tracking-wide">
        {title}
      </h3>

      <div className="relative overflow-hidden bg-white rounded-xl border border-secondary/10 py-6">
        <div
          className="flex gap-12 px-12"
          style={{
            animation: `${direction === "left" ? "scrollLeftInfinite" : "scrollRightInfinite"} ${duration}s linear infinite`,
            willChange: "transform",
          }}
        >
          {displayLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex-shrink-0 h-16 flex items-center justify-center">
              <img
                src={logo.url}
                alt={logo.name}
                className="h-12 md:h-14 object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>

      <style>{`
        @keyframes scrollLeftInfinite {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        @keyframes scrollRightInfinite {
          0% { transform: translate3d(-50%,0,0); }
          100% { transform: translate3d(0,0,0); }
        }
      `}</style>
    </div>
  );
}
