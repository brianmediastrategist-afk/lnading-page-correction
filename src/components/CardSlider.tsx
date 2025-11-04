import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string;
}

interface CardSliderProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  direction?: "left" | "right";
}

export default function CardSlider({ cards, onCardClick }: CardSliderProps) {
  const [isPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: "next" | "prev") => {
    const container = containerRef.current;
    if (!container) return;
    const delta = container.clientWidth * 0.9 * (direction === "next" ? 1 : -1);
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-6 px-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* hide scrollbar but keep scrollable */}
          {/* @ts-ignore */}
          <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-[260px] sm:w-80 md:w-96 cursor-pointer group snap-start"
              onClick={() => onCardClick(card)}
            >
              <div
                className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
              >
                <div className="w-full h-56 sm:h-60 md:h-64 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {card.description}
                  </p>
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardClick(card);
                      }}
                      className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                    >
                      More Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent"></div>

        {/* Controls */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous"
            onClick={() => scrollByAmount("prev")}
            className="shadow bg-white/80 backdrop-blur border-secondary/20 hover:bg-white hidden sm:inline-flex pointer-events-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next"
            onClick={() => scrollByAmount("next")}
            className="shadow bg-white/80 backdrop-blur border-secondary/20 hover:bg-white hidden sm:inline-flex pointer-events-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
