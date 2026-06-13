"use client";

import React, { useState, useEffect, useRef } from "react";
import { GalleryEntry } from "./GalleryGrid";

interface LightboxProps {
  entry: GalleryEntry | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLikeToggle: (id: number) => void;
  onEditEntry: (albumId: number, newImages: string[], title: string, description: string) => void;
  onDeleteEntry?: (albumId: number) => void;
}

export default function Lightbox({
  entry,
  onClose,
  onPrev,
  onNext,
  onLikeToggle,
  onEditEntry,
  onDeleteEntry,
}: LightboxProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [tempImages, setTempImages] = useState<string[]>([]);
  const [tempTitle, setTempTitle] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const [editUploading, setEditUploading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Initialize and reset states when entry changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsEditing(false);
    setEditError(null);
    if (entry) {
      setTempImages(entry.images || []);
      setTempTitle(entry.title || "");
      setTempDescription(entry.description || "");
    }
  }, [entry]);

  if (!entry) return null;

  const handlePrevImage = () => {
    if (!tempImages || tempImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev === 0 ? tempImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!tempImages || tempImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev === tempImages.length - 1 ? 0 : prev + 1));
  };

  const startEditing = () => {
    setTempImages(entry.images || []);
    setTempTitle(entry.title || "");
    setTempDescription(entry.description || "");
    setIsEditing(true);
    setEditError(null);
  };

  const cancelEditing = () => {
    setTempImages(entry.images || []);
    setTempTitle(entry.title || "");
    setTempDescription(entry.description || "");
    setIsEditing(false);
    setEditError(null);
  };

  const saveEditing = () => {
    if (!tempTitle.trim()) {
      setEditError("Title cannot be empty.");
      return;
    }
    onEditEntry(entry.id, tempImages, tempTitle, tempDescription);
    setIsEditing(false);
    setEditError(null);
  };

  const moveImage = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= tempImages.length) return;

    const newImages = [...tempImages];
    const temp = newImages[index];
    newImages[index] = newImages[newIndex];
    newImages[newIndex] = temp;

    setTempImages(newImages);

    // Keep the active image in focus
    if (activeImageIndex === index) {
      setActiveImageIndex(newIndex);
    } else if (activeImageIndex === newIndex) {
      setActiveImageIndex(index);
    }
  };

  const deleteImage = (index: number) => {
    if (tempImages.length <= 1) {
      setEditError("An album must have at least one image!");
      return;
    }

    const newImages = tempImages.filter((_, idx) => idx !== index);
    setTempImages(newImages);

    // Adjust active image index
    if (activeImageIndex >= newImages.length) {
      setActiveImageIndex(newImages.length - 1);
    }
  };

  const handleLocalAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      setEditError("Please select a valid image file.");
      return;
    }

    setEditUploading(true);
    setEditError(null);

    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
        headers: {
          "content-type": file.type,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image.");
      }

      const result = await response.json();
      if (!result.url) {
        throw new Error("No URL returned from upload response.");
      }

      const newImages = [...tempImages, result.url];
      setTempImages(newImages);

      // Focus on the newly uploaded image
      setActiveImageIndex(newImages.length - 1);
    } catch (err: any) {
      console.error(err);
      setEditError(err.message || "Failed to upload image.");
    } finally {
      setEditUploading(false);
      if (editFileInputRef.current) {
        editFileInputRef.current.value = "";
      }
    }
  };

  // Prevent event propagation for overlay clicks
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-ink-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 select-none transition-all duration-300"
    >
      {/* Navigation Arrows (Desktop/Tablet) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="hidden md:flex absolute left-4 md:left-10 z-50 bg-paper-yellow border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] p-3 rounded-full hover:bg-pastel-green hover:-translate-x-1 hover:shadow-none transition-all cursor-pointer text-ink-black"
      >
        <span className="material-symbols-outlined text-2xl font-bold block">west</span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="hidden md:flex absolute right-4 md:right-10 z-50 bg-paper-yellow border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] p-3 rounded-full hover:bg-pastel-green hover:translate-x-1 hover:shadow-none transition-all cursor-pointer text-ink-black"
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
          className="absolute top-4 right-4 md:top-6 md:right-6 bg-white border-2 border-ink-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] w-10 h-10 rounded-full flex items-center justify-center hover:bg-coral-orange hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer text-ink-black z-50"
        >
          <span className="material-symbols-outlined text-xl font-bold">close</span>
        </button>

        {/* Image Panel */}
        <div className="flex-1 flex flex-col justify-center items-center relative w-full mt-6 md:mt-0">
          {/* Washi tape on the top left */}
          <div className={`washi-tape ${entry.tapeColor} w-28 -top-3 left-4 -rotate-12`}></div>

          {/* Polaroid wrap */}
          <div className="bg-white p-3 pb-4 md:p-4 md:pb-6 border-2 border-ink-black shadow-[4px_4px_0px_0px_rgba(45,52,54,1)] w-full flex flex-col items-center justify-center">
            {/* Main Image Viewport with inner arrow overlay */}
            <div className="border border-ink-black/10 overflow-hidden w-full aspect-[4/3] max-h-[35vh] md:max-h-[45vh] flex items-center justify-center bg-neutral-100 relative group/img">
              <img
                src={tempImages[activeImageIndex] || entry.imageUrl}
                alt={entry.title}
                className="max-h-full max-w-full object-contain select-none"
              />
              
              {tempImages && tempImages.length > 1 && (
                <>
                  {/* Left Inner Arrow */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-ink-black text-ink-black p-1.5 rounded-full cursor-pointer transition-all active:scale-95 z-10 shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm font-bold block">chevron_left</span>
                  </button>
                  
                  {/* Right Inner Arrow */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-ink-black text-ink-black p-1.5 rounded-full cursor-pointer transition-all active:scale-95 z-10 shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm font-bold block">chevron_right</span>
                  </button>

                  {/* Image Counter Badge */}
                  <div className="absolute bottom-2 right-2 bg-ink-black text-white font-body text-[10px] px-2 py-0.5 rounded-sm border border-white/20 select-none">
                    {activeImageIndex + 1} / {tempImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip inside the Polaroid (like physical mini prints / film strip) */}
            {tempImages && tempImages.length > 1 && (
              <div className="flex gap-2.5 mt-3 justify-center w-full overflow-x-auto py-1 select-none scrollbar-thin">
                {tempImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-9 md:w-16 md:h-12 border-2 rounded-sm overflow-hidden flex-shrink-0 transition-all cursor-pointer ${
                      idx === activeImageIndex
                        ? "border-coral-orange scale-105 shadow-[2px_2px_0px_0px_rgba(45,52,54,0.4)]"
                        : "border-ink-black/20 hover:border-ink-black"
                    }`}
                  >
                    <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Details Panel */}
        {isEditing ? (
          /* Album Editor Panel */
          <div className="w-full md:w-[320px] flex flex-col justify-between pl-0 md:pl-4">
            <div className="flex flex-col">
              {/* Category badge & Action Buttons (Save/Cancel) */}
              <div className="flex justify-between items-center mb-4 pr-12 md:pr-14 gap-2">
                <span className="bg-pastel-green text-ink-black border border-ink-black text-xs font-body font-bold px-2.5 py-1 rounded-full w-max truncate">
                  #{entry.category.toLowerCase()}
                </span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* Cancel Button */}
                  <button
                    onClick={cancelEditing}
                    disabled={editUploading}
                    aria-label="Cancel editing"
                    className="flex items-center justify-center bg-white border-2 border-ink-black shadow-[1px_1px_0px_0px_rgba(45,52,54,1)] w-8 h-8 hover:bg-gray-100 transition-all cursor-pointer rounded-full disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">close</span>
                  </button>
                  {/* Save Button */}
                  <button
                    onClick={saveEditing}
                    disabled={editUploading}
                    aria-label="Save changes"
                    className="flex items-center justify-center bg-pastel-green text-ink-black border-2 border-ink-black shadow-[1px_1px_0px_0px_rgba(45,52,54,1)] w-8 h-8 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer rounded-full disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </button>
                </div>
              </div>

              <h3 className="font-headline text-xl text-ink-black mb-3">Edit Album Details</h3>
              
              <div className="flex flex-col gap-2 mb-3 pr-1">
                <input
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  placeholder="Snippet Title"
                  className="bg-white border-2 border-ink-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] p-2 font-headline text-sm w-full focus:outline-none focus:ring-2 focus:ring-coral-orange/50 transition-all"
                  disabled={editUploading}
                />
                <textarea
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                  placeholder="Snippet description..."
                  rows={2}
                  className="bg-white border-2 border-ink-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] p-2 font-body text-xs w-full resize-none focus:outline-none focus:ring-2 focus:ring-coral-orange/50 transition-all scrollbar-thin"
                  disabled={editUploading}
                />
              </div>

              <h4 className="font-headline text-sm text-ink-black mb-2">Photos</h4>
              
              {/* Album List of images */}
              <div className="flex flex-col gap-3 max-h-[28vh] overflow-y-auto pr-1 scrollbar-thin">
                {tempImages.map((imgUrl, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-2 border border-ink-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] select-none">
                    <img src={imgUrl} className="w-12 h-12 object-cover border border-ink-black/20" alt="" />
                    <div className="flex-grow flex items-center justify-between">
                      <span className="font-body text-[11px] text-ink-black/60 font-bold">Photo #{idx + 1}</span>
                      
                      <div className="flex items-center gap-1">
                        {/* Move Up */}
                        <button
                          type="button"
                          disabled={idx === 0 || editUploading}
                          onClick={() => moveImage(idx, -1)}
                          className="p-1 text-ink-black hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer rounded-sm flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-sm font-bold">arrow_upward</span>
                        </button>
                        {/* Move Down */}
                        <button
                          type="button"
                          disabled={idx === tempImages.length - 1 || editUploading}
                          onClick={() => moveImage(idx, 1)}
                          className="p-1 text-ink-black hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer rounded-sm flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-sm font-bold">arrow_downward</span>
                        </button>
                        {/* Delete */}
                        <button
                          type="button"
                          disabled={tempImages.length <= 1 || editUploading}
                          onClick={() => deleteImage(idx)}
                          className="p-1 text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer rounded-sm flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-sm font-bold">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add Image Button */}
              <div className="mt-4">
                <input
                  ref={editFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLocalAddImage}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => editFileInputRef.current?.click()}
                  disabled={editUploading}
                  className="w-full bg-white border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] p-2.5 font-headline text-xs font-bold hover:bg-pastel-green hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer rounded-sm flex items-center justify-center gap-1.5"
                >
                  {editUploading ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-ink-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm font-bold">add_photo_alternate</span>
                      <span>Add Image to Album</span>
                    </>
                  )}
                </button>
              </div>

              {editError && (
                <div className="bg-red-50 border border-red-200 text-red-700 font-body text-[10px] px-2 py-1 rounded-sm flex items-center gap-1 mt-3">
                  <span className="material-symbols-outlined text-xs font-bold">error</span>
                  <span>{editError}</span>
                </div>
              )}

              {/* Delete Snippet Button */}
              <div className="mt-4 pt-4 border-t border-dashed border-ink-black/20">
                <button
                  type="button"
                  disabled={editUploading}
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this snippet entirely?")) {
                      if (onDeleteEntry) onDeleteEntry(entry.id);
                    }
                  }}
                  className="w-full bg-red-50 text-red-600 border-2 border-red-600 shadow-[3px_3px_0px_0px_rgba(220,38,38,1)] p-2.5 font-headline text-xs font-bold hover:bg-red-100 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer rounded-sm flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm font-bold">delete_forever</span>
                  <span>Delete Snippet</span>
                </button>
              </div>
            </div>

            <div className="text-[10px] text-ink-black/40 mt-4 text-center font-bold">
              ID: #{entry.id} • editing mode
            </div>
          </div>
        ) : (
          /* Content Details Panel (Standard View) */
          <div className="w-full md:w-[320px] flex flex-col justify-between pl-0 md:pl-4">
            <div className="flex flex-col">
              {/* Category badge & Edit Button */}
              <div className="flex justify-between items-center mb-4 pr-12 md:pr-14">
                <span className="bg-pastel-green text-ink-black border border-ink-black text-xs font-body font-bold px-3 py-1 rounded-full w-max">
                  #{entry.category.toLowerCase()}
                </span>
                <button
                  onClick={startEditing}
                  aria-label="Edit Album"
                  className="flex items-center justify-center bg-white border-2 border-ink-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] w-8 h-8 hover:bg-pastel-green hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer rounded-full"
                >
                  <span className="material-symbols-outlined text-sm font-bold">edit</span>
                </button>
              </div>

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

                {/* Inline Navigation for Mobile */}
                <div className="flex md:hidden items-center gap-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrev();
                    }}
                    className="bg-paper-yellow border-2 border-ink-black p-1.5 rounded-full hover:bg-pastel-green active:scale-95 transition-all text-ink-black cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm font-bold block">west</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNext();
                    }}
                    className="bg-paper-yellow border-2 border-ink-black p-1.5 rounded-full hover:bg-pastel-green active:scale-95 transition-all text-ink-black cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm font-bold block">east</span>
                  </button>
                </div>

                <span className="text-xs font-body text-ink-black/40 font-bold">
                  ID: #{entry.id}
                </span>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
