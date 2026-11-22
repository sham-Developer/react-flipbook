import React from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

export const ThumbnailsDrawer = ({ isOpen, onClose, pages, currentPage, onSelectPage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center space-x-2 text-slate-800">
            <ImageIcon className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
              Visual Page Strip ({pages.length} Pages)
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal scrollable thumbnails */}
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
          {pages.map((p, idx) => {
            const isCurrent = currentPage === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectPage(idx);
                }}
                className={`flex-shrink-0 group flex flex-col items-center rounded-xl p-1.5 transition-all ${
                  isCurrent
                    ? 'ring-2 ring-indigo-600 bg-indigo-50 scale-105 shadow-sm'
                    : 'hover:bg-slate-50 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Mini page representation */}
                <div
                  className={`w-24 h-32 rounded-lg border overflow-hidden flex flex-col justify-between p-2 text-left relative shadow-sm ${
                    p.type === 'cover'
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : p.type === 'gallery' || p.type === 'urban'
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : p.type === 'backcover'
                      ? 'bg-zinc-900 border-slate-800 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="text-[7px] font-mono opacity-60 flex justify-between">
                    <span>{p.category || 'PAGE'}</span>
                    <span>{idx === 0 ? 'CVR' : idx}</span>
                  </div>

                  <div className="my-auto">
                    <p className="text-[8px] font-bold line-clamp-2 leading-tight">
                      {p.title}
                    </p>
                  </div>

                  <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600"
                      style={{ width: `${((idx + 1) / pages.length) * 100}%` }}
                    />
                  </div>
                </div>

                <span className="text-[10px] font-mono mt-1 text-slate-500 group-hover:text-indigo-600 font-medium">
                  {idx === 0 ? 'Cover' : `Page ${idx}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
