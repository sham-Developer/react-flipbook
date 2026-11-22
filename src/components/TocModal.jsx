import React from 'react';
import { X, BookOpen, ChevronRight, Layers } from 'lucide-react';

export const TocModal = ({ isOpen, onClose, onSelectPage, toc, currentPage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-wide">Table of Contents</h3>
              <p className="text-xs text-slate-500">Jump to any chapter or spread</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto p-4 space-y-2">
          {toc.map((item) => {
            const isCurrent = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => {
                  onSelectPage(item.page);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-semibold ${
                    isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {String(item.page).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-slate-400">
                  <span className="text-xs font-mono">P. {item.page}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span className="flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>{toc.length} Sections</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
