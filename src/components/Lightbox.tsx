"use client";

import React from "react";
import { GalleryEntry } from "./GalleryGrid";

interface LightboxProps {
  entry: GalleryEntry | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLikeToggle: (id: number) => void;
}

export default function Lightbox({
  entry,
  onClose,
  onPrev,
  onNext,
  onLikeToggle,
}: LightboxProps) {
  if (!entry) return null;

  // Prevent event propagation for overlay clicks
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-ink-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 select-none transition-all duration-300"
    >
      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-4 md:left-10 z-50 bg-paper-yellow border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] p-3 rounded-full hover:bg-pastel-green hover:-translate-x-1 hover:shadow-none transition-all cursor-pointer text-ink-black"
      >
        <span className="material-symbols-outlined text-2xl font-bold block">west</span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-4 md:right-10 z-50 bg-paper-yellow border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] p-3 rounded-full hover:bg-pastel-green hover:translate-x-1 hover:shadow-none transition-all cursor-pointer text-ink-black"
      >
        <span className="material-symbols-outlined text-2xl font-bold block">east</span>
      </button>

      {/* Main Sketchbook Page Modal */}
      <div
        onClick={handleModalClick}
        className="relative bg-paper-yellow w-full max-w-4xl border-2 border-ink-black shadow-[8px_8px_0px_0px_rgba(45,52,54,1)] p-6 md:p-10 rounded-sm flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook-dark.png")'
        }}
      >
        {/* Binder spiral representation on the left for desktop */}
        <div className="absolute left-0 top-0 bottom-0 w-3 hidden md:flex flex-col justify-around py-4 border-r border-dashed border-ink-black/20 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full border-2 border-ink-black bg-neutral-300 -ml-2 shadow-inner"></div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 md:top-6 md:right-6 bg-white border-2 border-ink-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] w-10 h-10 rounded-full flex items-center justify-center hover:bg-coral-orange hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer text-ink-black"
        >
          <span className="material-symbols-outlined text-xl font-bold">close</span>
        </button>

        {/* Image Panel */}
        <div className="flex-1 flex flex-col justify-center items-center relative">
          {/* Washi tape on the top left */}
          <div className={`washi-tape ${entry.tapeColor} w-28 -top-3 left-4 -rotate-12`}></div>

          {/* Polaroid wrap */}
          <div className="bg-white p-4 pb-12 border-2 border-ink-black shadow-[4px_4px_0px_0px_rgba(45,52,54,1)] w-full max-h-[60vh] flex flex-col items-center justify-center">
            <div className="border border-ink-black/10 overflow-hidden w-full h-full flex items-center justify-center bg-neutral-100">
              <img
                src={entry.imageUrl}
                alt={entry.title}
                className="max-h-[45vh] w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Content Details Panel */}
        <div className="w-full md:w-[320px] flex flex-col justify-between pl-0 md:pl-4">
          <div className="flex flex-col">
            {/* Category badge */}
            <span className="bg-pastel-green text-ink-black border border-ink-black text-xs font-body font-bold px-3 py-1 rounded-full w-max mb-4">
              #{entry.category.toLowerCase()}
            </span>

            {/* Title */}
            <h2 className="font-headline text-2xl md:text-3xl text-ink-black drop-shadow-[2px_2px_0px_rgba(45,52,54,0.1)] leading-tight transform -rotate-1">
              {entry.title}
            </h2>

            {/* Date metadata */}
            <span className="font-body text-xs text-ink-black/40 mt-1 block">
              Captured on: {entry.date}
            </span>

            {/* Separator */}
            <div className="border-b-2 border-dashed border-ink-black/20 my-4"></div>

            {/* Description (retromonospace notebook style) */}
            <div className="bg-surface-bg p-4 border border-ink-black shadow-[2px_2px_0px_rgba(45,52,54,1)] relative">
              <p className="font-body text-sm text-ink-black leading-relaxed whitespace-pre-wrap">
                {entry.description || "No description provided for this diary entry. Write something creative!"}
              </p>
              {/* Paperclip graphic decoration */}
              <span className="material-symbols-outlined absolute -top-4 -right-2 text-ink-black/40 text-3xl rotate-45 pointer-events-none">
                attach_file
              </span>
            </div>
          </div>

          {/* Interactive footer action items */}
          <div className="flex flex-col gap-3 mt-6">
            <div className="flex items-center justify-between border-t border-dashed border-ink-black/20 pt-3">

              {/* Like block */}
              <button
                onClick={() => onLikeToggle(entry.id)}
                className={`flex items-center gap-2 text-sm font-bold transition-all hover:scale-105 cursor-pointer ${
                  entry.hasLiked ? "text-coral-orange" : "text-ink-black/50 hover:text-coral-orange"
                }`}
              >
                <span 
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: entry.hasLiked ? '"FILL" 1' : '"FILL" 0' }}
                >
                  favorite
                </span>
                <span>{entry.likes} Likes</span>
              </button>

              <span className="text-xs font-body text-ink-black/40 font-bold">
                ID: #{entry.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
