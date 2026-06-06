"use client";

import React from "react";

export interface GalleryEntry {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  date: string;
  tapeColor: string;
  tapeRotation: string;
  cardRotation: string;
  likes: number;
  hasLiked?: boolean;
}

interface GalleryGridProps {
  entries: GalleryEntry[];
  onCardClick: (entry: GalleryEntry) => void;
  onLikeToggle: (id: number, e: React.MouseEvent) => void;
  searchQuery: string;
}

const CATEGORIES = ["All", "Painting", "Photos", "Sketches", "Crafts"];

export default function GalleryGrid({
  entries,
  onCardClick,
  onLikeToggle,
  searchQuery,
}: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // Filter entries by category and search query
  const filteredEntries = entries.filter((entry) => {
    const matchesCategory = selectedCategory === "All" || entry.category === selectedCategory;
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-paper-yellow bg-grid-pattern relative py-12 px-6 md:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b-2 border-dashed border-ink-black pb-6">
          <div className="flex items-center gap-3 transform -rotate-1">
            <span className="material-symbols-outlined text-4xl text-tertiary text-coral-orange">
              photo_library
            </span>
            <h2 className="font-headline text-3xl text-ink-black">Recent Snippets</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 font-body text-xs rounded-full border-2 border-ink-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer ${
                    isActive
                      ? "bg-pastel-green text-ink-black font-bold"
                      : "bg-surface-bg text-ink-black/70"
                  }`}
                >
                  #{category.toLowerCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry / Grid Layout */}
        {filteredEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-7xl text-ink-black/30 mb-4 animate-bounce">
              folder_open
            </span>
            <h3 className="font-headline text-2xl text-ink-black">No snippets found</h3>
            <p className="font-body text-sm text-ink-black/60 mt-2">
              Try searching for something else or add a new entry!
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-10">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => onCardClick(entry)}
                className={`relative break-inside-avoid group cursor-pointer transition-all duration-300`}
              >
                {/* Washi Tape */}
                <div
                  className={`washi-tape ${entry.tapeColor} w-24 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${entry.tapeRotation}`}
                ></div>

                {/* Polaroid Body */}
                <div
                  className={`bg-white p-3 border-2 border-ink-black shadow-[6px_6px_0px_0px_rgba(45,52,54,1)] transform ${entry.cardRotation} group-hover:rotate-0 group-hover:scale-[1.02] group-hover:shadow-[10px_10px_0px_0px_rgba(45,52,54,1)] transition-all duration-300`}
                >
                  {/* Image container with postage stamp simulation */}
                  <div className="border border-ink-black/20 overflow-hidden relative aspect-[4/3] bg-neutral-100">
                    <img
                      alt={entry.title}
                      className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                      src={entry.imageUrl}
                    />
                    <div className="absolute top-2 right-2 bg-ink-black/70 text-white font-body text-[10px] px-2 py-0.5 rounded-sm">
                      {entry.category}
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <div className="mt-3 font-body select-none">
                    <h3 className="font-bold text-sm text-ink-black truncate">
                      {entry.title}
                    </h3>
                    <p className="text-xs text-ink-black/60 mt-1 line-clamp-2 leading-relaxed">
                      {entry.description}
                    </p>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-dashed border-ink-black/20">
                      <span className="text-[10px] text-ink-black/40">{entry.date}</span>
                      
                      {/* Heart Like Button */}
                      <button
                        onClick={(e) => onLikeToggle(entry.id, e)}
                        className={`flex items-center gap-1 text-xs font-bold transition-all hover:scale-110 cursor-pointer ${
                          entry.hasLiked ? "text-coral-orange" : "text-ink-black/40 hover:text-coral-orange"
                        }`}
                      >
                        <span 
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: entry.hasLiked ? '"FILL" 1' : '"FILL" 0' }}
                        >
                          favorite
                        </span>
                        <span>{entry.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
