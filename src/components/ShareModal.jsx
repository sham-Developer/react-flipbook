import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageSquare, Send, Globe, Mail } from 'lucide-react';

export const ShareModal = ({ isOpen, onClose, bookTitle, currentPage }) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}?page=${currentPage}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'X / Twitter',
      icon: MessageSquare,
      color: 'bg-slate-900 text-white hover:bg-slate-800',
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${bookTitle} (Page ${currentPage})`)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
      }
    },
    {
      name: 'LinkedIn',
      icon: Globe,
      color: 'bg-[#0A66C2] text-white hover:bg-[#084e96]',
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
      }
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#229ED9] text-white hover:bg-[#1d87ba]',
      action: () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(bookTitle)}`, '_blank');
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-emerald-600 text-white hover:bg-emerald-700',
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(bookTitle)}&body=${encodeURIComponent(`Explore this interactive flipbook at page ${currentPage}: ${shareUrl}`)}`;
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-wide">Share Publication</h3>
              <p className="text-xs text-slate-500">Share current view (Page {currentPage})</p>
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

        <div className="p-5 space-y-4">
          {/* Quick social share buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            {shareOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.name}
                  type="button"
                  onClick={opt.action}
                  className={`flex items-center space-x-2.5 p-3 rounded-xl border border-transparent transition shadow-sm ${opt.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-semibold">{opt.name}</span>
                </button>
              );
            })}
          </div>

          {/* Copy link input */}
          <div className="mt-4">
            <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5 font-medium">
              Direct Link to Page {currentPage}
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-1">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent px-3 py-1.5 text-xs text-slate-700 w-full focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
