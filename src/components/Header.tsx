"use client";

import React from "react";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <header 
      className="bg-surface-bg text-bright-blue w-full border-b-2 border-dashed border-ink-black shadow-[4px_4px_0px_0px_rgba(45,52,54,1)] flex justify-between items-center px-4 md:px-20 py-4 relative z-50 transition-all"
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook-dark.png")'
      }}
    >
      {/* Brand Logo */}
      <div className="font-headline text-2xl md:text-3xl text-coral-orange italic flex items-center gap-2 select-none">
        <span 
          className="material-symbols-outlined" 
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          edit
        </span>
        DoodleDiary
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
        <a 
          className="text-ink-black/70 hover:text-ink-black hover:rotate-2 hover:scale-105 transition-transform" 
          href="#"
        >
          Stamps
        </a>
      </nav>

      {/* Trailing Actions */}
      <div className="flex items-center gap-4">
        <button 
          className="bg-coral-orange text-ink-black border-2 border-ink-black shadow-[4px_4px_0px_0px_rgba(45,52,54,1)] px-5 py-2 font-headline text-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-sm cursor-pointer"
        >
          Join Club
        </button>
      </div>
    </header>
  );
}

