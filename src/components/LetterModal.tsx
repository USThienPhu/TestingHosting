"use client";

import React, { useState, useEffect } from "react";

interface LetterModalProps {
  onClose: () => void;
}

interface Letter {
  id: number;
  content: string;
  created_at: string;
}

export default function LetterModal({ onClose }: LetterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/letters");
      if (response.ok) {
        const data = await response.json();
        setLetters(data);
      }
    } catch (error) {
      console.error("Failed to fetch letters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-black/80 backdrop-blur-sm p-4 font-body">
      {/* Close button outside envelope */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-coral-orange transition-colors"
      >
        <span className="material-symbols-outlined text-4xl">close</span>
      </button>

      <div className="flex flex-col items-center">
        {!isOpen && (
          <h2 className="text-white font-headline text-3xl mb-8 animate-pulse text-center">
            You have a letter...<br/>
            <span className="text-sm font-body text-white/70 font-normal">Click the envelope to open</span>
          </h2>
        )}

        <div className="perspective-1000 relative mt-16 sm:mt-24">
          <div 
            className={`envelope-container w-[320px] sm:w-[400px] h-[220px] sm:h-[260px] relative transition-transform duration-700 ${isOpen ? 'translate-y-12' : 'hover:-translate-y-2 cursor-pointer'}`}
            onClick={() => !isOpen && setIsOpen(true)}
          >
            {/* Back of Envelope */}
            <div className="absolute inset-0 bg-[#c9a66b] shadow-inner rounded-sm border border-[#b5955f]"></div>

            {/* Letter Paper */}
            <div 
              className={`absolute left-2 right-2 sm:left-4 sm:right-4 bg-[#fdfbf7] border border-[#e0dbce] shadow-md transition-all duration-700 ease-in-out z-20 flex flex-col ${isOpen ? '-translate-y-[280px] sm:-translate-y-[320px] h-[360px] sm:h-[420px] z-40' : 'translate-y-0 h-full bottom-2'}`}
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #94a3b8 28px)',
                backgroundPositionY: '30px',
                backgroundSize: '100% 28px'
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing/opening when clicking paper
            >
              {/* Paper Content */}
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-center items-center mb-4 border-b border-dashed border-ink-black/20 pb-2">
                  <h3 className="font-headline text-xl text-ink-black/80">
                    Thư
                  </h3>
                </div>

                  <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    {isLoading ? (
                      <div className="text-center text-ink-black/50 text-sm mt-10">Loading letters...</div>
                    ) : letters.length === 0 ? (
                      <div className="text-center text-ink-black/50 text-sm mt-10">No letters yet.</div>
                    ) : (
                      <div className="space-y-6">
                        {letters.map((letter) => (
                          <div key={letter.id} className="pb-4 border-b border-ink-black/10 last:border-0">
                            <p className="text-sm sm:text-base text-ink-black whitespace-pre-wrap leading-relaxed">{letter.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
              </div>
            </div>

            {/* Left Flap */}
            <div className="absolute inset-0 z-30 pointer-events-none" style={{
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
              backgroundColor: '#dcb879',
              borderRight: '1px solid rgba(0,0,0,0.05)'
            }}></div>

            {/* Right Flap */}
            <div className="absolute inset-0 z-30 pointer-events-none" style={{
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
              backgroundColor: '#dcb879',
              borderLeft: '1px solid rgba(0,0,0,0.05)'
            }}></div>

            {/* Bottom Flap */}
            <div className="absolute inset-0 z-30 pointer-events-none" style={{
              clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
              backgroundColor: '#e2be80',
              borderTop: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 -2px 5px rgba(0,0,0,0.05)'
            }}></div>

            {/* Top Flap (Animated) */}
            <div 
              className={`absolute top-0 left-0 right-0 h-full z-50 origin-top transition-transform duration-700 ease-in-out pointer-events-none ${isOpen ? 'rotate-x-180 z-10' : 'rotate-x-0'}`}
              style={{
                clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
                backgroundColor: '#d4af37',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                backfaceVisibility: 'hidden'
              }}
            ></div>
            
            {/* Top Flap Backside (visible when opened) */}
             <div 
              className={`absolute top-0 left-0 right-0 h-full origin-top transition-transform duration-700 ease-in-out pointer-events-none ${isOpen ? 'rotate-x-0 z-10' : '-rotate-x-180 z-10'}`}
              style={{
                clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
                backgroundColor: '#c9a66b',
                backfaceVisibility: 'hidden'
              }}
            ></div>

            {/* Wax Seal */}
            <div className={`absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-700 rounded-full z-50 flex items-center justify-center shadow-lg transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-10 h-10 border-2 border-red-800 rounded-full flex items-center justify-center text-red-900 font-headline font-bold text-xl select-none" style={{ backgroundColor: '#a61c1c' }}>
                <span className="material-symbols-outlined text-white/80 text-xl">favorite</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
