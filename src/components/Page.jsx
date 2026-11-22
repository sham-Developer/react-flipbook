import React, { forwardRef } from 'react';

export const Page = forwardRef(({ page, index, totalPages }, ref) => {
  // Render different page templates based on type
  return (
    <div
      ref={ref}
      className="page w-full h-full select-none overflow-hidden bg-stone-50 text-stone-800 relative"
      data-density="soft"
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 mix-blend-multiply opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Inner spine shadow effect & page depth gradient */}
      <div
        className={`absolute top-0 bottom-0 pointer-events-none z-15 ${
          index % 2 === 0
            ? 'left-0 w-12 bg-gradient-to-r from-black/25 via-black/10 to-transparent'
            : 'right-0 w-12 bg-gradient-to-l from-black/25 via-black/10 to-transparent'
        }`}
      />

      {/* Subtle outer edge curve shadow */}
      <div
        className={`absolute top-0 bottom-0 pointer-events-none z-10 w-4 ${
          index % 2 === 0
            ? 'right-0 bg-gradient-to-l from-black/5 to-transparent'
            : 'left-0 bg-gradient-to-r from-black/5 to-transparent'
        }`}
      />

      {/* Page Content Variations */}
      {page.type === 'cover' && (
        <div className={`w-full h-full bg-gradient-to-br ${page.bgGradient} text-white p-10 flex flex-col justify-between relative`}>
          <div className="flex justify-between items-start border-b border-white/20 pb-4">
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-amber-400 font-semibold">
              {page.badge}
            </span>
            <span className="text-[10px] tracking-widest text-stone-400 font-mono">
              {page.issue}
            </span>
          </div>

          <div className="my-auto py-8">
            <h1 className="text-6xl font-black tracking-tight leading-none text-white drop-shadow-md">
              {page.title}
            </h1>
            <p className="text-sm tracking-[0.25em] text-amber-400 font-medium mt-3 uppercase">
              {page.subtitle}
            </p>
            <div className="w-16 h-1 bg-amber-500 my-6"></div>
            <p className="text-stone-300 text-xs leading-relaxed max-w-xs font-light">
              {page.description}
            </p>
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between items-end">
            <div>
              <p className="text-[11px] text-stone-400 font-mono">{page.author}</p>
              <p className="text-[9px] text-stone-500 mt-0.5">International Architectural Compendium</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-[9px] text-amber-300/80 tracking-widest">
                {page.barcode}
              </span>
            </div>
          </div>
        </div>
      )}

      {page.type === 'flyleaf' && (
        <div className="w-full h-full p-10 flex flex-col justify-between bg-[#fbfaf8] border-r border-stone-100">
          <div className="text-[9px] font-mono tracking-widest text-stone-400 border-b border-stone-200/60 pb-3">
            ARCHIVE REGISTRY
          </div>
          <div className="my-auto max-w-xs">
            <h3 className="text-xl font-bold tracking-tight text-stone-900 font-serif mb-1">
              {page.title}
            </h3>
            <p className="text-xs font-mono text-amber-700 uppercase tracking-widest mb-6">
              {page.subtitle}
            </p>
            <div className="w-8 h-0.5 bg-stone-300 mb-4"></div>
            <p className="text-xs text-stone-600 leading-relaxed font-light mb-2">
              {page.note}
            </p>
            <p className="text-[10px] text-stone-400 font-mono">
              {page.copyright}
            </p>
          </div>
          <div className="text-[8px] font-mono text-stone-400">
            IDC DESIGN MONOGRAPHS
          </div>
        </div>
      )}

      {page.type === 'editorial' && (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-[#faf8f5]">
          <div>
            <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-stone-400 border-b border-stone-200 pb-2">
              <span>IDC DISCOURSE</span>
              <span>PAGE {page.number}</span>
            </div>
            <div className="mt-8">
              <span className="text-amber-700 text-xs font-mono uppercase tracking-widest block mb-1">
                {page.subtitle}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900 font-serif">
                {page.title}
              </h2>
            </div>
            <div className="my-6 border-l-2 border-amber-600 pl-4 py-1 italic text-stone-700 text-xs leading-relaxed">
              "{page.quote}"
            </div>
            <div className="space-y-3 text-stone-600 text-xs leading-relaxed font-light">
              {page.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-200 pt-4 flex justify-between items-center">
            <span className="text-[11px] font-serif italic text-stone-800">
              — {page.signature}
            </span>
            <span className="text-[10px] font-mono text-stone-400">{page.author}</span>
          </div>
        </div>
      )}

      {page.type === 'toc' && (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-stone-400 border-b border-stone-200 pb-2">
              <span>ARCHIVE INDEX</span>
              <span>PAGE {page.number}</span>
            </div>
            <div className="mt-6 mb-4">
              <span className="text-stone-400 text-xs font-mono tracking-widest uppercase">
                {page.subtitle}
              </span>
              <h2 className="text-2xl font-bold text-stone-900 font-serif">
                {page.title}
              </h2>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-stone-100 rounded-lg">
              {page.stats.map((s, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-lg font-bold text-amber-700 font-mono">{s.value}</div>
                  <div className="text-[9px] text-stone-500 uppercase">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Items list */}
            <div className="divide-y divide-stone-100 text-xs">
              {page.items.map((it, i) => (
                <div key={i} className="py-2.5 flex items-baseline justify-between group">
                  <div className="flex items-baseline space-x-3 pr-2">
                    <span className="font-mono text-stone-400 text-[11px] font-semibold">
                      {it.no}
                    </span>
                    <div>
                      <div className="font-medium text-stone-800">{it.title}</div>
                      <div className="text-[10px] text-stone-500 font-light truncate max-w-[200px]">
                        {it.sub}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-stone-400">P. {it.no}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[9px] font-mono text-stone-400 text-center border-t border-stone-100 pt-3">
            Click on any page edge or use the bottom navigation to flip
          </div>
        </div>
      )}

      {page.type === 'feature' && (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-[#fbfbf9]">
          <div>
            <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-stone-400 border-b border-stone-200 pb-2">
              <span>{page.category}</span>
              <span>PAGE {page.number}</span>
            </div>
            <div className="mt-4 mb-4">
              <span className="text-amber-800 text-[10px] font-mono uppercase tracking-widest">
                {page.subtitle}
              </span>
              <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                {page.title}
              </h2>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-md my-3 border border-stone-200 aspect-[16/10]">
              <img
                src={page.image}
                alt={page.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-[9px] text-stone-500 italic mb-3">{page.caption}</p>
            <p className="text-xs text-stone-700 leading-relaxed font-light">{page.text}</p>
          </div>
          <div className="text-[10px] font-mono text-stone-400 flex justify-between border-t border-stone-200 pt-3">
            <span>CURATED ESSAY</span>
            <span>ISSUE 42</span>
          </div>
        </div>
      )}

      {page.type === 'casestudy' && (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-stone-50">
          <div>
            <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-stone-400 border-b border-stone-200 pb-2">
              <span>{page.category}</span>
              <span>PAGE {page.number}</span>
            </div>
            <div className="mt-4 mb-3">
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                {page.title}
              </h2>
              <p className="text-xs text-amber-700 font-medium">
                {page.location} • <span className="text-stone-500">{page.architect}</span>
              </p>
            </div>
            <div className="relative rounded overflow-hidden shadow mb-4 aspect-[16/10]">
              <img
                src={page.image}
                alt={page.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {page.metrics.map((m, idx) => (
                <div key={idx} className="bg-stone-200/70 p-2 rounded text-center">
                  <div className="text-xs font-mono font-bold text-stone-800">{m.val}</div>
                  <div className="text-[8px] text-stone-500 uppercase">{m.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-light">{page.text}</p>
          </div>
          <div className="text-[9px] font-mono text-stone-400 text-right border-t border-stone-200 pt-2">
            RESEARCH CODE: CS-KYOTO-2025
          </div>
        </div>
      )}

      {page.type === 'tech' && (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-slate-50">
          <div>
            <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-stone-400 border-b border-stone-200 pb-2">
              <span>{page.category}</span>
              <span>PAGE {page.number}</span>
            </div>
            <div className="mt-4 mb-4">
              <span className="text-cyan-800 text-[10px] font-mono tracking-widest">
                {page.subtitle}
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                {page.title}
              </h2>
            </div>
            <div className="rounded overflow-hidden mb-4 shadow aspect-[16/9]">
              <img src={page.image} alt={page.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-3">
              {page.points.map((pt, i) => (
                <div key={i} className="border-l-2 border-cyan-600 pl-3">
                  <h4 className="text-xs font-bold text-slate-800">{pt.heading}</h4>
                  <p className="text-[11px] text-slate-600 leading-snug">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[9px] font-mono text-slate-400 flex justify-between border-t border-slate-200 pt-2">
            <span>ZERO CARBON PROTOCOL</span>
            <span>SECTION 5</span>
          </div>
        </div>
      )}

      {page.type === 'gallery' && (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-zinc-900 text-stone-100">
          <div>
            <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-zinc-500 border-b border-zinc-800 pb-2">
              <span>{page.category}</span>
              <span>PAGE {page.number}</span>
            </div>
            <div className="mt-4 mb-3">
              <span className="text-amber-400 text-[10px] font-mono uppercase tracking-widest">
                {page.subtitle}
              </span>
              <h2 className="text-2xl font-serif text-white">{page.title}</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 my-4">
              <div className="h-44 rounded overflow-hidden">
                <img src={page.image} alt="Shadow Study 1" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="h-44 rounded overflow-hidden">
                <img src={page.detailImage} alt="Shadow Study 2" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
              "{page.quote}"
            </p>
          </div>
          <div className="text-[9px] font-mono text-zinc-500 border-t border-zinc-800 pt-2 flex justify-between">
            <span>PHOTOMETRIC ANALYSIS</span>
            <span>HIGH RES STUDY</span>
          </div>
        </div>
      )}

      {page.type === 'trend' && (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-stone-100">
          <div>
            <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-stone-400 border-b border-stone-200 pb-2">
              <span>{page.category}</span>
              <span>PAGE {page.number}</span>
            </div>
            <div className="mt-4 mb-3">
              <span className="text-amber-800 text-[10px] font-mono uppercase">{page.subtitle}</span>
              <h2 className="text-2xl font-serif text-stone-900 font-bold">{page.title}</h2>
            </div>
            <div className="rounded overflow-hidden shadow-sm mb-4 aspect-[16/11]">
              <img src={page.image} alt={page.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-light">{page.body}</p>
          </div>
          <div className="text-[10px] font-mono text-stone-400 flex justify-between border-t border-stone-200 pt-2">
            <span>SCANDINAVIAN INTERIORS</span>
            <span>TREND REPORT</span>
          </div>
        </div>
      )}

      {page.type === 'materials' && (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-stone-50">
          <div>
            <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-stone-400 border-b border-stone-200 pb-2">
              <span>{page.category}</span>
              <span>PAGE {page.number}</span>
            </div>
            <div className="mt-4 mb-3">
              <span className="text-amber-800 text-[10px] font-mono uppercase">{page.subtitle}</span>
              <h2 className="text-xl font-bold font-serif text-stone-900">{page.title}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 my-4">
              {page.swatches.map((sw, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded shadow-inner flex-shrink-0"
                    style={{ backgroundColor: sw.tone }}
                  />
                  <div>
                    <h5 className="text-[11px] font-semibold text-stone-800 leading-tight">{sw.name}</h5>
                    <p className="text-[9px] text-stone-500 font-mono">{sw.origin}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-light">{page.body}</p>
          </div>
          <div className="text-[9px] font-mono text-stone-400 border-t border-stone-200 pt-2 text-right">
            SPECIFICATION ARCHIVE
          </div>
        </div>
      )}

      {page.type === 'urban' && (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-slate-900 text-white">
          <div>
            <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-slate-400 border-b border-slate-700 pb-2">
              <span>{page.category}</span>
              <span>PAGE {page.number}</span>
            </div>
            <div className="mt-4 mb-3">
              <span className="text-emerald-400 text-[10px] font-mono uppercase">{page.subtitle}</span>
              <h2 className="text-2xl font-bold tracking-tight text-white">{page.title}</h2>
            </div>
            <div className="rounded overflow-hidden mb-4 aspect-[16/9] border border-slate-700">
              <img src={page.image} alt={page.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              {page.stats.map((st, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs font-mono font-bold text-emerald-400">{st.num}</div>
                  <div className="text-[8px] text-slate-400 uppercase mt-0.5">{st.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">{page.text}</p>
          </div>
          <div className="text-[9px] font-mono text-slate-500 border-t border-slate-800 pt-2 flex justify-between">
            <span>METROPOLIS 2040</span>
            <span>SUSTAINABILITY</span>
          </div>
        </div>
      )}

      {page.type === 'forecast' && (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-stone-50">
          <div>
            <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-stone-400 border-b border-stone-200 pb-2">
              <span>{page.category}</span>
              <span>PAGE {page.number}</span>
            </div>
            <div className="mt-4 mb-4">
              <span className="text-amber-800 text-[10px] font-mono uppercase">{page.subtitle}</span>
              <h2 className="text-xl font-bold text-stone-900 font-serif">{page.title}</h2>
            </div>
            <div className="space-y-3">
              {page.pillars.map((pl, idx) => (
                <div key={idx} className="p-3 bg-white rounded border border-stone-200/80 shadow-sm">
                  <h4 className="text-xs font-bold text-stone-900 mb-1">{pl.title}</h4>
                  <p className="text-[11px] text-stone-600 leading-relaxed font-light">{pl.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-mono text-stone-400 border-t border-stone-200 pt-2 flex justify-between">
            <span>FUTURE STUDY</span>
            <span>PAGE {page.number} OF {totalPages}</span>
          </div>
        </div>
      )}

      {page.type === 'backcover' && (
        <div className={`w-full h-full bg-gradient-to-tr ${page.bgGradient} text-white p-10 flex flex-col justify-between relative`}>
          <div className="border-b border-white/20 pb-3">
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-stone-400">
              {page.brand}
            </span>
          </div>

          <div className="my-auto text-center px-4">
            <div className="w-12 h-1 bg-amber-500 mx-auto mb-6"></div>
            <blockquote className="text-sm font-serif italic text-stone-200 leading-relaxed">
              "{page.quote}"
            </blockquote>
            <p className="text-xs font-mono text-amber-400 mt-3">— {page.quoteAuthor}</p>
          </div>

          <div className="border-t border-white/10 pt-4 text-center">
            <p className="text-[9px] text-stone-400 font-mono tracking-widest mb-1">
              {page.isbn}
            </p>
            <p className="text-[9px] text-stone-500 font-mono">
              {page.year}
            </p>
          </div>
        </div>
      )}

      {/* Page number footer on regular editorial pages */}
      {page.type !== 'cover' && page.type !== 'backcover' && page.type !== 'flyleaf' && (
        <div className="absolute bottom-2 left-0 right-0 px-8 flex justify-between pointer-events-none text-[9px] font-mono text-stone-400">
          <span>{index % 2 === 0 ? `Page ${index - 1}` : ''}</span>
          <span>{index % 2 !== 0 ? `Page ${index - 1}` : ''}</span>
        </div>
      )}
    </div>
  );
});

Page.displayName = 'Page';
