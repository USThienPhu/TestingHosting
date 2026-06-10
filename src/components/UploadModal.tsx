"use client";

import React, { useState, useRef } from "react";
import { GalleryEntry } from "./GalleryGrid";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  albums: GalleryEntry[];
  onUploadSuccess: (albumId: number, imageUrl: string) => void;
}

export default function UploadModal({
  isOpen,
  onClose,
  albums,
  onUploadSuccess,
}: UploadModalProps) {
  const [selectedAlbumId, setSelectedAlbumId] = useState<number>(
    albums.length > 0 ? albums[0].id : 0
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    setError(null);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !selectedAlbumId) {
      setError("Please select an album and an image file.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Fetch upload endpoint
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(selectedFile.name)}`, {
        method: "POST",
        body: selectedFile,
        headers: {
          "content-type": selectedFile.type,
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

      // Success callback
      onUploadSuccess(selectedAlbumId, result.url);

      // Reset states and close
      setSelectedFile(null);
      setPreviewUrl(null);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div 
        className="relative bg-paper-yellow w-full max-w-lg border-2 border-ink-black shadow-[8px_8px_0px_0px_rgba(45,52,54,1)] p-6 md:p-8 rounded-sm flex flex-col gap-6"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook-dark.png")'
        }}
      >
        {/* Binder Clip top decoration */}
        <span className="material-symbols-outlined text-ink-black/40 text-3xl rotate-45 absolute -top-5 -left-3">
          attach_file
        </span>

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={uploading}
          className="absolute top-4 right-4 bg-white border-2 border-ink-black shadow-[2px_2px_0px_0px_rgba(45,52,54,1)] w-8 h-8 rounded-full flex items-center justify-center hover:bg-coral-orange hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer text-ink-black disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm font-bold">close</span>
        </button>

        {/* Header Title */}
        <div className="text-center transform -rotate-1">
          <h2 className="font-headline text-2xl md:text-3xl text-ink-black drop-shadow-[2px_2px_0px_rgba(45,52,54,0.1)]">
            Add to Collection
          </h2>
          <p className="font-body text-xs text-ink-black/60 mt-1">
            Pin new photo memories directly into your scrapbook albums.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpload} className="flex flex-col gap-5">
          {/* Select Album */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="album-select" className="font-body text-sm font-bold text-ink-black/80">
              Select Scrapbook Album:
            </label>
            <select
              id="album-select"
              value={selectedAlbumId}
              onChange={(e) => setSelectedAlbumId(Number(e.target.value))}
              disabled={uploading}
              className="bg-white border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] p-3 font-body text-sm text-ink-black focus:outline-none focus:bg-paper-yellow transition-all rounded-sm cursor-pointer disabled:opacity-50"
            >
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title} ({album.category})
                </option>
              ))}
            </select>
          </div>

          {/* Drag & Drop File Zone */}
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-sm font-bold text-ink-black/80">
              Upload Photo:
            </span>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] relative ${
                dragActive
                  ? "border-coral-orange bg-coral-orange/5"
                  : previewUrl
                  ? "border-ink-black bg-white"
                  : "border-ink-black/30 hover:border-ink-black hover:bg-white/50"
              } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative w-full flex flex-col items-center gap-2">
                  <div className="border border-ink-black/10 max-h-[120px] max-w-[200px] overflow-hidden rounded-sm relative shadow-sm">
                    <img src={previewUrl} className="h-full w-full object-contain" alt="Preview" />
                  </div>
                  <span className="font-body text-[11px] text-ink-black/60 truncate max-w-[240px] font-bold">
                    {selectedFile?.name}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl text-ink-black/40 animate-pulse">
                    add_photo_alternate
                  </span>
                  <p className="font-body text-sm text-ink-black/80 font-bold">
                    Drag & drop your photo here, or <span className="text-bright-blue underline">browse</span>
                  </p>
                  <p className="font-body text-[10px] text-ink-black/40">
                    Supports JPG, PNG, GIF, WEBP up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 font-body text-xs px-3 py-2 rounded-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm font-bold">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="bg-white border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] hover:bg-gray-50 px-4 py-2 font-headline text-sm rounded-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="bg-coral-orange text-ink-black border-2 border-ink-black shadow-[3px_3px_0px_0px_rgba(45,52,54,1)] px-5 py-2 font-headline text-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all rounded-sm cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-ink-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Pinning...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm font-bold">push_pin</span>
                  <span>Pin to Album</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
