"use client";

import React, { useState } from "react";

interface Slide {
  id: number;
  imageUrl: string;
  title: string;
  tapeColor: string;
  tapeRotation: string;
  cardRotation: string;
}

const CAROUSEL_SLIDES: Slide[] = [
  {
    id: 1,
    imageUrl: "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/ptb2.jpg",
    title: "Morning sketches - Day 42",
    tapeColor: "tape-coral",
    tapeRotation: "-rotate-12",
    cardRotation: "rotate-1",
  },
  {
    id: 2,
    imageUrl: "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/z6344277640904_e15bb3bfd59b930157923c6992070a46.jpg",
    title: "Cafe inspiration & sketches",
    tapeColor: "tape-yellow",
    tapeRotation: "rotate-6",
    cardRotation: "-rotate-2",
  },
  {
    id: 3,
    imageUrl: "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/ptb3.jpg",
    title: "Photobooth scrapbook memory",
    tapeColor: "tape-green",
    tapeRotation: "rotate-12",
    cardRotation: "rotate-3",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === CAROUSEL_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-blue-scrapbook pt-16 pb-28 md:pb-36 px-6 md:px-20 overflow-hidden min-h-[60vh] flex flex-col items-center justify-center z-10 select-none">
      {/* Hand-drawn Doodles (Floating decoration) */}
      
      {/* Hand-drawn SVG Star (Top Left) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute top-8 left-8 w-16 h-16 text-white/20 fill-none stroke-current stroke-2 pointer-events-none animate-gentle-float hidden md:block"
        style={{ "--initial-rotate": "-15deg" } as React.CSSProperties}
      >
        <path d="M50 10 C50 35, 35 50, 10 50 C35 50, 50 65, 50 90 C50 65, 65 50, 90 50 C65 50, 50 35, 50 10 Z" />
      </svg>

      {/* Hand-drawn SVG Heart (Bottom Right) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-16 right-10 w-16 h-16 text-white/25 fill-none stroke-current stroke-2 pointer-events-none animate-gentle-drift hidden md:block"
        style={{ "--initial-rotate": "12deg" } as React.CSSProperties}
      >
        <path d="M50,30 C35,10 10,25 10,50 C10,75 40,85 50,90 C60,85 90,75 90,50 C90,25 65,10 50,30 Z" />
      </svg>

      {/* Hand-drawn SVG Paper Airplane (Top Right) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute top-10 right-12 w-20 h-20 text-white/20 fill-none stroke-current stroke-2 pointer-events-none animate-gentle-float"
        style={{ "--initial-rotate": "25deg" } as React.CSSProperties}
      >
        <path d="M15 50 L85 20 L55 80 L45 55 Z M45 55 L85 20" />
        <path d="M45 55 L35 70 L35 58" />
        <path d="M10 68 Q25 72 30 60 T50 72" strokeDasharray="3 3" />
      </svg>

      {/* Hand-drawn SVG Pencil (Bottom Left) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-20 left-10 w-16 h-16 text-white/20 fill-none stroke-current stroke-2 pointer-events-none animate-gentle-drift"
        style={{ "--initial-rotate": "-45deg" } as React.CSSProperties}
      >
        <path d="M20,80 L80,20 M70,10 L90,30 M20,80 L35,80 L20,65 Z M30,70 L25,75" />
      </svg>

      {/* Floating Sparkle Symbols */}
      <span
        className="material-symbols-outlined absolute top-1/4 left-1/4 text-white/15 text-5xl pointer-events-none animate-gentle-float"
        style={{ "--initial-rotate": "10deg" } as React.CSSProperties}
      >
        auto_awesome
      </span>
      <span
        className="material-symbols-outlined absolute bottom-1/4 right-1/4 text-white/15 text-6xl pointer-events-none animate-gentle-drift"
        style={{ "--initial-rotate": "-15deg" } as React.CSSProperties}
      >
        draw
      </span>
      <span
        className="material-symbols-outlined absolute top-8 left-1/3 text-white/15 text-4xl pointer-events-none animate-gentle-float hidden md:inline-block"
        style={{ "--initial-rotate": "5deg" } as React.CSSProperties}
      >
        palette
      </span>
      <span
        className="material-symbols-outlined absolute bottom-12 left-1/3 text-white/15 text-5xl pointer-events-none animate-gentle-drift hidden md:inline-block"
        style={{ "--initial-rotate": "-20deg" } as React.CSSProperties}
      >
        push_pin
      </span>


      <div className="text-center mb-10 z-20">
        <h1 className="font-headline text-4xl md:text-6xl text-paper-yellow mb-4 drop-shadow-[4px_4px_0px_rgba(45,52,54,1)] transform -rotate-1">
          Our Journey
        </h1>
        <p className="font-body text-base md:text-lg text-white bg-ink-black/20 px-4 py-2 inline-block -rotate-1 border border-white/20 rounded-sm">
          Flipping through the pages of inspiration.
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center z-20">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="hidden sm:flex absolute left-[-20px] md:left-[-40px] z-30 bg-paper-yellow border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] p-3 rounded-full hover:bg-pastel-green hover:-translate-x-1 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-ink-black font-bold block">west</span>
        </button>

        {/* Polaroid Deck */}
        <div className="relative w-full aspect-[4/3] max-w-md md:max-w-lg overflow-visible">
          {CAROUSEL_SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex === 0 ? CAROUSEL_SLIDES.length - 1 : currentIndex - 1);
            const isNext = index === (currentIndex === CAROUSEL_SLIDES.length - 1 ? 0 : currentIndex + 1);

            let slideStyle = "opacity-0 scale-75 pointer-events-none z-0";
            if (isActive) {
              slideStyle = `opacity-100 scale-100 z-20 ${slide.cardRotation}`;
            } else if (isPrev) {
              slideStyle = "opacity-40 -translate-x-[15%] scale-90 rotate-[-4deg] z-10 cursor-pointer";
            } else if (isNext) {
              slideStyle = "opacity-40 translate-x-[15%] scale-90 rotate-[4deg] z-10 cursor-pointer";
            }

            return (
              <div
                key={slide.id}
                onClick={() => !isActive && setCurrentIndex(index)}
                className={`absolute inset-0 transition-all duration-500 transform ${slideStyle}`}
              >
                {/* Washi Tape Accent */}
                <div className={`washi-tape ${slide.tapeColor} w-32 -top-4 left-1/2 -translate-x-1/2 ${slide.tapeRotation}`}></div>

                {/* Polaroid Frame */}
                <div className="bg-paper-yellow p-4 pb-12 border-2 border-ink-black shadow-[8px_8px_0px_0px_rgba(45,52,54,1)] w-full h-full flex flex-col relative select-none">
                  {/* Metal clip representation */}
                  <svg
                    className="absolute -top-5 -left-3 w-10 h-10 text-ink-black/60 rotate-12 z-30 pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9v10a5 5 0 0 0 10 0V6a3 3 0 0 0-6 0v11a1 1 0 0 0 2 0V9"></path>
                  </svg>

                  {/* Photo area */}
                  <div className="flex-grow border-2 border-ink-black overflow-hidden relative bg-neutral-200">
                    <img
                      alt={slide.title}
                      className="object-cover w-full h-full grayscale-[10%] sepia-[5%] transition-all duration-300"
                      src={slide.imageUrl}
                    />
                  </div>

                  {/* Caption */}
                  <p className="font-body text-ink-black text-center mt-3 text-sm font-bold truncate">
                    {slide.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="hidden sm:flex absolute right-[-20px] md:right-[-40px] z-30 bg-paper-yellow border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] p-3 rounded-full hover:bg-pastel-green hover:translate-x-1 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-ink-black font-bold block">east</span>
        </button>
      </div>

      {/* Page indicator dot markers (Desktop) */}
      <div className="hidden sm:flex gap-2 mt-8 z-20">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full border border-ink-black transition-all cursor-pointer ${
              index === currentIndex ? "bg-coral-orange scale-110" : "bg-paper-yellow"
            }`}
          ></button>
        ))}
      </div>

      {/* Mobile Controls: Prev, Dots, Next */}
      <div className="flex sm:hidden items-center gap-6 mt-8 z-20">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="bg-paper-yellow border-2 border-ink-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] p-2.5 rounded-full cursor-pointer hover:bg-pastel-green active:scale-95 transition-all text-ink-black"
        >
          <span className="material-symbols-outlined text-ink-black font-bold text-sm block">west</span>
        </button>
        <div className="flex gap-2">
          {CAROUSEL_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full border border-ink-black transition-all cursor-pointer ${
                index === currentIndex ? "bg-coral-orange scale-110" : "bg-paper-yellow"
              }`}
            ></button>
          ))}
        </div>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="bg-paper-yellow border-2 border-ink-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] p-2.5 rounded-full cursor-pointer hover:bg-pastel-green active:scale-95 transition-all text-ink-black"
        >
          <span className="material-symbols-outlined text-ink-black font-bold text-sm block">east</span>
        </button>
      </div>

      {/* Tear Paper Bottom Divider */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-30 pointer-events-none">
        <svg
          className="relative block w-full h-[40px] md:h-[60px]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#FFFDE7"
          ></path>
        </svg>
      </div>
    </section>
  );
}
