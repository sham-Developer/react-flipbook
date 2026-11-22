import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  BookOpen,
  LayoutGrid,
  Share2,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const ControlsBar = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  isAutoplay,
  onToggleAutoplay,
  isFullscreen,
  onToggleFullscreen,
  onToggleToc,
  onToggleThumbnails,
  onToggleShare,
  isMuted,
  onToggleSound,
}) => {
  return (
    <footer className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-slate-700 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      {/* Left section: TOC & Thumbnails */}
      <div className="flex items-center space-x-1.5 sm:space-x-2">
        <button
          type="button"
          onClick={onToggleToc}
          title="Table of Contents"
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition cursor-pointer hover:text-indigo-600"
        >
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span className="hidden md:inline">Contents</span>
        </button>

        <button
          type="button"
          onClick={onToggleThumbnails}
          title="Page Thumbnails"
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition cursor-pointer hover:text-indigo-600"
        >
          <LayoutGrid className="w-4 h-4 text-indigo-600" />
          <span className="hidden md:inline">Thumbnails</span>
        </button>
      </div>

      {/* Center section: Pagination & Autoplay */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentPage <= 0}
          title="Previous Page"
          className="p-1.5 sm:p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-40 disabled:hover:bg-slate-100 transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="flex items-center space-x-2 font-mono text-xs px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg shadow-inner">
          <span className="text-indigo-600 font-bold">
            {currentPage === 0
              ? 'Cover'
              : currentPage >= totalPages - 1
              ? `End (${totalPages - 1})`
              : `${currentPage} - ${Math.min(currentPage + 1, totalPages - 1)}`}
          </span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-500 font-medium">{totalPages - 1}</span>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage >= totalPages - 1}
          title="Next Page"
          className="p-1.5 sm:p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-40 disabled:hover:bg-slate-100 transition cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Autoplay button */}
        <button
          type="button"
          onClick={onToggleAutoplay}
          title={isAutoplay ? "Pause Autoplay" : "Start Autoplay (every 4s)"}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            isAutoplay
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 animate-pulse'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="hidden sm:inline">{isAutoplay ? 'Autoplaying' : 'Auto'}</span>
        </button>
      </div>

      {/* Right section: Zoom, Audio, Share, Fullscreen */}
      <div className="flex items-center space-x-1 sm:space-x-1.5">
        {/* Zoom Out */}
        <button
          type="button"
          onClick={onZoomOut}
          disabled={zoom <= 0.7}
          title="Zoom Out"
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 transition cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onResetZoom}
          title="Reset Zoom"
          className="px-2 py-1 text-[11px] font-mono text-slate-700 bg-slate-100 rounded border border-slate-200 hover:text-indigo-600 transition cursor-pointer"
        >
          {Math.round(zoom * 100)}%
        </button>

        {/* Zoom In */}
        <button
          type="button"
          onClick={onZoomIn}
          disabled={zoom >= 1.6}
          title="Zoom In"
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 transition cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          title={isMuted ? "Unmute Page Turns" : "Mute Sound"}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={onToggleShare}
          title="Share Publication"
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-indigo-600 transition cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-indigo-600 transition cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </footer>
  );
};
