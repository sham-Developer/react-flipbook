import React, { useEffect, useRef, useState, useCallback } from 'react';
import $ from '../utils/turn';
import { Page } from './Page';
import { ControlsBar } from './ControlsBar';
import { TocModal } from './TocModal';
import { ShareModal } from './ShareModal';
import { ThumbnailsDrawer } from './ThumbnailsDrawer';
import { bookData } from '../data/bookData';
import { soundManager } from '../utils/sound';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

export const FlipBook = () => {
  const containerRef = useRef(null);
  const bookWrapperRef = useRef(null);

  // Turn.js 1-indexed pages: 1 = Front Cover, 2 = Inside Flyleaf, 3 = Editorial, etc.
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = bookData.pages.length;
  const [zoom, setZoom] = useState(1);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [viewMode, setViewMode] = useState('double');

  // Book Dimensions: 510 x 760 single page -> 1020 x 760 double spread (larger immersive scale)
  const PAGE_WIDTH = 510;
  const PAGE_HEIGHT = 760;
  const BOOK_WIDTH = PAGE_WIDTH * 2; // 1020

  useEffect(() => {
    if (!containerRef.current) return;

    const $book = $(containerRef.current);

    // Initialize Turn.js
    $book.turn({
      width: BOOK_WIDTH,
      height: PAGE_HEIGHT,
      autoCenter: false, // Centered via responsive wrapper transform
      display: 'double',
      acceleration: true,
      elevation: 50,
      gradients: true,
      duration: 650,
      when: {
        turning: function (event, page, pageObject) {
          soundManager.playFlip();
          setCurrentPage(page);
        },
        turned: function (event, page, pageObject) {
          setCurrentPage(page);
        },
      },
    });

    // Check URL search parameters for initial page bookmark
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlPage = parseInt(params.get('page'), 10);
      if (!isNaN(urlPage) && urlPage >= 0 && urlPage < totalPages) {
        setTimeout(() => {
          try {
            $book.turn('page', urlPage + 1);
          } catch {
            // ignore
          }
        }, 300);
      }
    }

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        $book.turn('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        $book.turn('previous');
      } else if (e.key === 'Escape') {
        setShowToc(false);
        setShowShare(false);
        setShowThumbnails(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      try {
        $book.turn('destroy');
      } catch {
        // cleanup
      }
    };
  }, []);

  // Dynamic auto-scale based on screen & fullscreen viewport size
  const [autoScale, setAutoScale] = useState(1);
  const mainStageRef = useRef(null);

  useEffect(() => {
    const calculateScale = () => {
      if (!mainStageRef.current) return;
      // Tight margins so the book fills virtually all vertical and horizontal stage space
      const availableW = window.innerWidth - 32;
      const availableH = window.innerHeight - 74; // bottom controls allowance only

      // Natural spread size
      const targetW = BOOK_WIDTH;
      const targetH = PAGE_HEIGHT;

      // Scale to fit available stage
      const scaleX = availableW / targetW;
      const scaleY = availableH / targetH;
      const computed = Math.min(scaleX, scaleY);

      // Keep scale comfortably bounded
      const finalScale = Math.max(0.6, Math.min(computed, 1.6));
      setAutoScale(+finalScale.toFixed(3));
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [isFullscreen]);

  // Autoplay timer
  useEffect(() => {
    let timer = null;
    if (isAutoplay && containerRef.current) {
      timer = setInterval(() => {
        const $book = $(containerRef.current);
        if ($book.turn('is')) {
          if (currentPage >= totalPages) {
            $book.turn('page', 1);
          } else {
            $book.turn('next');
          }
        }
      }, 4200);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoplay, currentPage, totalPages]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handlers
  const handlePrev = useCallback(() => {
    if (containerRef.current) {
      $(containerRef.current).turn('previous');
    }
  }, []);

  const handleNext = useCallback(() => {
    if (containerRef.current) {
      $(containerRef.current).turn('next');
    }
  }, []);

  const handleTurnTo = useCallback((pageZeroIndex) => {
    if (containerRef.current) {
      $(containerRef.current).turn('page', pageZeroIndex + 1);
    }
  }, []);

  const handleZoomIn = () => setZoom((z) => Math.min(+(z + 0.15).toFixed(2), 1.6));
  const handleZoomOut = () => setZoom((z) => Math.max(+(z - 0.15).toFixed(2), 0.7));
  const handleResetZoom = () => setZoom(1);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (bookWrapperRef.current?.requestFullscreen) {
        bookWrapperRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div
      ref={bookWrapperRef}
      className="relative flex flex-col h-screen w-screen overflow-hidden bg-slate-100/90 text-slate-800 select-none"
    >
      {/* Floating Logo Only (No Header Bar) */}
      <div className="absolute top-5 left-6 z-30 flex items-center space-x-2.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm">
        <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-500/20">
          <BookOpen className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-black tracking-wider text-slate-900 font-mono">
          IDC
        </span>
      </div>

      {/* Main Flipbook Canvas Stage */}
      <main ref={mainStageRef} className="flex-1 relative flex items-center justify-center overflow-hidden p-2 sm:p-6">
        {/* Soft studio desk background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        {/* Scalable Container with auto-calculated responsive screen size & manual zoom */}
        <div
          className="transition-transform duration-300 ease-out flex items-center justify-center"
          style={{
            transform: `scale(${+(autoScale * zoom).toFixed(3)})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Centering Stage Wrapper that Turn.js cannot overwrite */}
          <div
            className="relative"
            style={{
              transform:
                currentPage === 1
                  ? 'translateX(-25%)'
                  : currentPage >= totalPages
                  ? 'translateX(25%)'
                  : 'translateX(0)',
              transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            {/* Turn.js Book Mount */}
            <div
              ref={containerRef}
              id="turn-flipbook"
              style={{
                width: `${BOOK_WIDTH}px`,
                height: `${PAGE_HEIGHT}px`,
              }}
            >
              {bookData.pages.map((p, idx) => (
                <div
                  key={p.id}
                  className="turn-page"
                  style={{
                    width: `${PAGE_WIDTH}px`,
                    height: `${PAGE_HEIGHT}px`,
                  }}
                >
                  <Page
                    page={p}
                    index={idx}
                    totalPages={bookData.pages.length}
                  />
                </div>
              ))}
            </div>

            {/* Quick Flip Buttons positioned right beside the visible book edges */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage <= 1}
              className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-slate-900/90 hover:bg-indigo-600 text-white shadow-2xl ring-2 ring-white/80 hover:ring-indigo-300 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 z-30 cursor-pointer flex items-center justify-center w-12 h-12 p-0 backdrop-blur-sm ${
                currentPage === 1 ? 'left-[50%] -translate-x-16' : '-left-16'
              }`}
              title="Previous Page (Left Arrow)"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-slate-900/90 hover:bg-indigo-600 text-white shadow-2xl ring-2 ring-white/80 hover:ring-indigo-300 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 z-30 cursor-pointer flex items-center justify-center w-12 h-12 p-0 backdrop-blur-sm ${
                currentPage >= totalPages ? 'right-[50%] translate-x-16' : '-right-16'
              }`}
              title="Next Page (Right Arrow)"
              aria-label="Next Page"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Controls Bar */}
      <ControlsBar
        currentPage={currentPage - 1}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        isAutoplay={isAutoplay}
        onToggleAutoplay={() => setIsAutoplay((v) => !v)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onToggleToc={() => setShowToc((v) => !v)}
        onToggleThumbnails={() => setShowThumbnails((v) => !v)}
        onToggleShare={() => setShowShare((v) => !v)}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Table of Contents Modal */}
      <TocModal
        isOpen={showToc}
        onClose={() => setShowToc(false)}
        onSelectPage={handleTurnTo}
        toc={bookData.toc}
        currentPage={currentPage - 1}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        bookTitle={bookData.title}
        currentPage={currentPage - 1}
      />

      {/* Thumbnails Drawer */}
      <ThumbnailsDrawer
        isOpen={showThumbnails}
        onClose={() => setShowThumbnails(false)}
        pages={bookData.pages}
        currentPage={currentPage - 1}
        onSelectPage={handleTurnTo}
      />
    </div>
  );
};
