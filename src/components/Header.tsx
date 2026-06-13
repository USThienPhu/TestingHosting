"use client";

import React from "react";

interface HeaderProps {
  onAddClick?: () => void;
  onLetterClick?: () => void;
}

export default function Header({ onAddClick, onLetterClick }: HeaderProps) {
  return (
    <header 
      className="bg-surface-bg text-bright-blue w-full border-b-2 border-dashed border-ink-black shadow-[4px_4px_0px_0px_rgba(45,52,54,1)] flex justify-between items-center px-4 md:px-20 py-4 relative z-50 transition-all"
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook-dark.png")'
      }}
    >
      {/* Brand Logo */}
      <div className="font-headline text-xl md:text-3xl text-coral-orange italic flex items-center gap-1.5 md:gap-2 select-none">
        <span 
          className="material-symbols-outlined text-xl md:text-2xl" 
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          edit
        </span>
        Nheo Phú Collection
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 font-body text-base">
        <a 
          className="text-bright-blue font-bold border-b-2 border-bright-blue pb-1 translate-y-[2px] transition-all" 
          href="#"
        >
          Gallery
        </a>
        <a 
          className="text-ink-black/70 hover:text-ink-black hover:rotate-2 hover:scale-105 transition-transform" 
          href="#"
        >
          Artists
        </a>
        <a 
          className="text-ink-black/70 hover:text-ink-black hover:rotate-2 hover:scale-105 transition-transform" 
          href="#"
        >
          Journal
        </a>

      </nav>

      {/* Trailing Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={onLetterClick}
          className="text-ink-black/70 hover:text-coral-orange hover:rotate-6 hover:scale-110 transition-transform cursor-pointer bg-transparent border-none p-1 flex items-center justify-center"
          aria-label="Open Letters"
        >
          <span className="material-symbols-outlined text-2xl md:text-3xl">mail</span>
        </button>
        <button 
          onClick={onAddClick}
          className="bg-coral-orange text-ink-black border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] sm:shadow-[4px_4px_0px_0px_rgba(45,52,54,1)] px-3 py-1.5 sm:px-5 sm:py-2 font-headline text-xs sm:text-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-sm cursor-pointer"
        >
          add snippet
        </button>
      </div>
    </header>
  );
}

