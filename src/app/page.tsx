"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import GalleryGrid, { GalleryEntry } from "../components/GalleryGrid";
import Lightbox from "../components/Lightbox";

// Initial mock entries featuring the user's images and decorative scrapbook photos
const INITIAL_ENTRIES: GalleryEntry[] = [
  {
    id: 1,
    imageUrl: "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/ptb2.jpg",
    title: "Morning sketches - Day 42",
    category: "Sketches",
    description: "A vibrant, messy artist's desk filled with watercolor palettes, scattered brushes, and a half-finished illustration on thick textured paper. Morning sunlight casting soft shadows.",
    date: "Jun 5, 2026",
    tapeColor: "tape-coral",
    tapeRotation: "-rotate-12",
    cardRotation: "rotate-2",
    likes: 12,
    hasLiked: false,
  },
  {
    id: 2,
    imageUrl: "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/z6344277640904_e15bb3bfd59b930157923c6992070a46.jpg",
    title: "Cafe inspiration",
    category: "Sketches",
    description: "Hands holding a thick worn sketchbook filled with intricate black ink doodle art. The setting is bright and airy in a minimalist cafe workspace, focusing on tactile analog drawing.",
    date: "Jun 3, 2026",
    tapeColor: "tape-yellow",
    tapeRotation: "rotate-6",
    cardRotation: "-rotate-1",
    likes: 24,
    hasLiked: false,
  },
  {
    id: 3,
    imageUrl: "https://nrpql5sstrbjjyra.public.blob.vercel-storage.com/ptb3.jpg",
    title: "Analog Photobooth strip",
    category: "Photos",
    description: "Nostalgic film photobooth strip lying next to pencils. Capturing happy smiles, fun poses, and vintage memories with friends. Pure organic scrapbook vibe.",
    date: "May 28, 2026",
    tapeColor: "tape-green",
    tapeRotation: "rotate-[35deg]",
    cardRotation: "rotate-3",
    likes: 42,
    hasLiked: true,
  },
  {
    id: 4,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-5ERtKKJTV-Dw5KQMCYuxU4y2BIgAqEdhhdt0J-huYAIXJVKscNrCBwNLCipCMbZ9C-wj6eoIhUg1kAlynNI1ZZNVV62Fw-19R4b2gOlfKRr_Wu78JGhLaCp3VxnDxNsTShQgXOrJE71HvlA1MHi0qe6ejPLR5RB0OE7UppmuUuvJrRo1_HtdwbyJ82BEz-fHibGsnNhNaGxsr0FnAwM68ZutjjbW7fnTsigWGiGizTYpwWjQ07OXtcoI4b_gG5bOHcIkY8k36Q",
    title: "Stationery tape collection",
    category: "Crafts",
    description: "A colorful collection of washi tape rolls stacked on a desk. Patterns include stripes, polka dots, and floral motifs - essential tools for decorating scrapbooks.",
    date: "May 25, 2026",
    tapeColor: "tape-blue",
    tapeRotation: "-rotate-6",
    cardRotation: "-rotate-2",
    likes: 9,
    hasLiked: false,
  },
  {
    id: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATLehqdJ1G0_37t8DVpzbb5ggCKkrwgr6uRENCvOkju2BppCXfx48JyK2v9cvdLJagN_PE7w_qMRjnatyasHfZOMQMxxPHFOXHWPPhDpNQIZIUEchVvz_GR6pVjoIHAWd1jC864Bb7cJhHtxuHTdwSaWRzVwryj_y3FO3Ay7VG5YTuPEBHZizuFI6jhkfyJ6Um2Mn9wrt13gePs00YDvpnut3J140v6-uPlasQ2n6tRi16VV_C7AOTJycvEELBsMQRBw1wSltPeA",
    title: "Pastel watercolor wash",
    category: "Painting",
    description: "Abstract watercolor painting in soft pastel green, blue, and yellow hues bleeding organically into thick textured cold press paper. Handcrafted art.",
    date: "May 19, 2026",
    tapeColor: "tape-coral",
    tapeRotation: "rotate-12",
    cardRotation: "rotate-1",
    likes: 18,
    hasLiked: false,
  },
  {
    id: 6,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqJJ-RvLmVAHAEFX6hUR2GqYz1MrH4p27cA0htH6FW3XvLvt7Hri43kBSev-ocE3m7WlSwiT9MWUPNOGlhjS2_KeH2GNjRZ1sm88KWVY88bLGQ8RsDq27D2IhWuvLd5JnFYL6y_dmZ0lERHJTg8QHZucLmMxCYVNosjwBHQcoFNvVRkSY_Eb-mfn3FAJE-S6tAMt9pXmmzY-bfE8bNlxyi9iDrDv-GS3Ty3OdH8pbnDriQ_xLy1jWptDcY0DQKaLTtFEhNAdp8dg",
    title: "Analog memory keep",
    category: "Photos",
    description: "A vintage film camera lying next to scattered physical polaroid photos on a wooden table. Nostalgic storytelling at its best.",
    date: "May 10, 2026",
    tapeColor: "tape-yellow",
    tapeRotation: "-rotate-12",
    cardRotation: "-rotate-3",
    likes: 35,
    hasLiked: false,
  },
];

export default function Home() {
  const [entries, setEntries] = useState<GalleryEntry[]>(INITIAL_ENTRIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<GalleryEntry | null>(null);

  // Manage Liking entries
  const handleLikeToggle = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent card clicks
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const hasLikedNow = !entry.hasLiked;
          return {
            ...entry,
            likes: hasLikedNow ? entry.likes + 1 : entry.likes - 1,
            hasLiked: hasLikedNow,
          };
        }
        return entry;
      })
    );

    // Keep selected item state aligned
    setSelectedEntry((prev) => {
      if (prev && prev.id === id) {
        const hasLikedNow = !prev.hasLiked;
        return {
          ...prev,
          likes: hasLikedNow ? prev.likes + 1 : prev.likes - 1,
          hasLiked: hasLikedNow,
        };
      }
      return prev;
    });
  };

  // Modal navigation controls in Lightbox
  const handlePrevEntry = () => {
    if (!selectedEntry) return;
    const currentIndex = entries.findIndex((e) => e.id === selectedEntry.id);
    const prevIndex = currentIndex === 0 ? entries.length - 1 : currentIndex - 1;
    setSelectedEntry(entries[prevIndex]);
  };

  const handleNextEntry = () => {
    if (!selectedEntry) return;
    const currentIndex = entries.findIndex((e) => e.id === selectedEntry.id);
    const nextIndex = currentIndex === entries.length - 1 ? 0 : currentIndex + 1;
    setSelectedEntry(entries[nextIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper-yellow text-ink-black font-body">
      {/* Top Navigation Header bar */}
      <Header />

      {/* Hero Interactive Slide presentation */}
      <HeroCarousel />

      {/* Interactive Search strip */}
      <div className="relative py-8 px-6 md:px-20 z-20 flex justify-center -mt-6">
        <div 
          className="bg-white border-2 border-ink-black shadow-[4px_4px_0px_0px_rgba(45,52,54,1)] w-full max-w-xl p-3 flex items-center gap-3 relative transform -rotate-1 select-none"
          style={{
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook-dark.png")'
          }}
        >
          {/* Notebook binder clip */}
          <span className="material-symbols-outlined text-ink-black/40 text-2xl rotate-45 absolute -top-4 -left-3">
            attach_file
          </span>

          <span className="material-symbols-outlined text-ink-black/50">search</span>
          <input
            type="text"
            placeholder="Search diary tags, captions, descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-transparent text-sm text-ink-black border-none focus:outline-none placeholder-ink-black/30 font-body py-1"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-ink-black/40 hover:text-ink-black cursor-pointer text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Masonry gallery Grid display area */}
      <main className="flex-grow">
        <GalleryGrid
          entries={entries}
          onCardClick={(entry) => setSelectedEntry(entry)}
          onLikeToggle={(id, e) => handleLikeToggle(id, e)}
          searchQuery={searchQuery}
        />
      </main>

      {/* Torn Edge Separator above Footer */}
      <div className="w-full relative h-10 bg-paper-yellow overflow-hidden pointer-events-none mt-12 z-10">
        <div className="torn-edge-top"></div>
      </div>

      {/* Scrapbook Footer panel */}
      <footer 
        className="bg-surface-bg border-t-2 border-dashed border-ink-black/30 py-8 px-6 md:px-20 flex flex-col items-center gap-4 text-center font-body text-sm text-ink-black/70 select-none relative z-20"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook-dark.png")'
        }}
      >
        <div className="font-headline text-lg text-ink-black font-bold mb-2">
          DoodleDiary Gallery
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold">
          <a className="hover:text-bright-blue transition-colors" href="#">Privacy Paper</a>
          <a className="hover:text-bright-blue transition-colors" href="#">Terms of Scrapbook</a>
          <a className="hover:text-bright-blue transition-colors" href="#">Contact Ink</a>
        </div>
        <p className="text-[11px] text-ink-black/40 mt-4 font-bold">
          © {new Date().getFullYear()} Crafted with Love & Washi Tape • DoodleDiary
        </p>
      </footer>

      {/* Lightbox details modal */}
      {selectedEntry && (
        <Lightbox
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onPrev={handlePrevEntry}
          onNext={handleNextEntry}
          onLikeToggle={(id) => handleLikeToggle(id)}
        />
      )}
    </div>
  );
}
