export const bookData = {
  title: "VANGUARD ARCHITECTURE & MODERN LIVING",
  subtitle: "Issue 42 • Annual Design Showcase",
  author: "IDC Studio",
  toc: [
    { page: 0, title: "Front Cover", category: "Cover" },
    { page: 1, title: "Cover Inside / Flyleaf", category: "Preamble" },
    { page: 2, title: "Editor's Foreword", category: "Editorial" },
    { page: 3, title: "Contents & Overview", category: "Editorial" },
    { page: 4, title: "Modern Organic Architecture", category: "Feature Story" },
    { page: 5, title: "The Concrete Sanctuary", category: "Case Study" },
    { page: 6, title: "Sustainable Geometries", category: "Technology" },
    { page: 7, title: "Interior Light Dynamics", category: "Visual Focus" },
    { page: 8, title: "Nordic Minimalist Living", category: "Living Trends" },
    { page: 9, title: "Materiality & Raw Textures", category: "Materials" },
    { page: 10, title: "Urban Density & Green Towers", category: "Urbanism" },
    { page: 11, title: "Future Outlook 2030", category: "Forecast" },
    { page: 12, title: "Epilogue & Credits", category: "Epilogue" },
    { page: 13, title: "Back Cover", category: "Cover" },
  ],
  pages: [
    // Page 0: Front Cover
    {
      id: 0,
      type: "cover",
      bgGradient: "from-zinc-950 via-slate-900 to-amber-950",
      accent: "#f59e0b",
      badge: "EXCLUSIVE EDITION 2026",
      title: "VANGUARD",
      subtitle: "ARCHITECTURE & MODERN LIVING",
      author: "Curated by IDC Design Lab",
      issue: "Vol. 42 • Global Edition",
      description: "A definitive exploration into spatial purity, monolithic forms, and human-centric environmental philosophy.",
      barcode: "IDC-84920-2026",
    },
    // Page 1: Inside Front Cover (Flyleaf / Blank endpaper)
    {
      id: 1,
      type: "flyleaf",
      title: "IDC VANGUARD",
      subtitle: "MONOGRAPH SERIES 2026",
      note: "Published by IDC Design Press, Zurich & Tokyo.",
      copyright: "All text and visual rights reserved."
    },
    // Page 2: Editorial Note / Foreword
    {
      id: 2,
      type: "editorial",
      number: "01",
      title: "THE SILENT DIALOGUE OF SPACES",
      subtitle: "Editorial Note",
      author: "Marcus Vance, Editor-in-Chief",
      quote: "Architecture is not merely enclosing space; it is framing life's quietest intimacies with enduring permanence.",
      body: [
        "In this edition of IDC Vanguard, we step beyond traditional functionalism. The spaces we inhabit shape our emotional frequencies, our clarity of thought, and our shared rituals.",
        "From raw rammed-earth dwellings nestled in Alpine cliffs to parametric bamboo pavilions breathing in tropical monsoon climates, humanity's structures are evolving toward a conscious harmony.",
        "We invite you to turn these digital pages slowly—observing how light interacts with grain, stone, and silence."
      ],
      signature: "Marcus Vance"
    },
    // Page 3: Table of Contents & Overview
    {
      id: 3,
      type: "toc",
      number: "02",
      title: "INDEX OF CURATION",
      subtitle: "Navigation & Chapters",
      stats: [
        { label: "Case Studies", value: "18" },
        { label: "Global Architects", value: "34" },
        { label: "Materials Explored", value: "12" }
      ],
      items: [
        { no: "04", title: "Modern Organic Architecture", sub: "Integrating nature without apology" },
        { no: "05", title: "The Concrete Sanctuary", sub: "Brutalism softened by diffused morning skylights" },
        { no: "06", title: "Sustainable Geometries", sub: "Passive heating, carbon sinks, and timber grids" },
        { no: "07", title: "Interior Light Dynamics", sub: "Ray-tracing physics in real-world living rooms" },
        { no: "08", title: "Nordic Minimalist Living", sub: "The Scandinavian balance of tactile warmth" }
      ]
    },
    // Page 4: Feature Story
    {
      id: 4,
      type: "feature",
      number: "03",
      category: "FEATURE ESSAY",
      title: "ORGANIC BIOMORPHISM",
      subtitle: "The Eradication of the Right Angle",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      caption: "Villa Selene • Lake Como, Italy • Curvilinear concrete cantilever",
      text: "When Antoni Gaudí posited that nature has no straight lines, modern industrial builders dismissed it as impractical ornament. Today, with algorithmic computational geometry and five-axis robotic timber milling, structures breathe like lung tissue."
    },
    // Page 5: Case Study
    {
      id: 5,
      type: "casestudy",
      number: "04",
      category: "CASE STUDY 01",
      title: "THE CONCRETE SANCTUARY",
      location: "Kyoto Prefecture, Japan",
      architect: "Kenzo Muro & Associates",
      metrics: [
        { label: "Footprint", val: "380 m²" },
        { label: "Embodied Carbon", val: "-35%" },
        { label: "Completion", val: "Nov 2025" }
      ],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
      text: "Formed with recycled fly-ash cement and cedar board shuttering, the house displays delicate wood-grain embossing across its load-bearing walls. An unadorned inner courtyard collects rainwater into a serene reflective pool."
    },
    // Page 6: Technology
    {
      id: 6,
      type: "tech",
      number: "05",
      category: "SUSTAINABILITY LAB",
      title: "THERMAL MASS INNOVATION",
      subtitle: "Engineering Zero-Energy Comfort",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      points: [
        { heading: "Sub-terrain Geothermal", desc: "Constant 14°C ground warmth circulated through hydronic slabs." },
        { heading: "Phase-Change Wall Linings", desc: "Micro-encapsulated organic paraffin wax absorbs excess midday heat spikes." },
        { heading: "Acoustic Insulation", desc: "Mycelium composite acoustic baffling replaces synthetic fiberglass." }
      ]
    },
    // Page 7: Visual Focus
    {
      id: 7,
      type: "gallery",
      number: "06",
      category: "VISUAL STUDY",
      title: "THE ANATOMY OF SHADOW",
      subtitle: "How Light Defines Spatial Depth",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
      detailImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80",
      quote: "We do not experience spaces by daylight alone, but by how skillfully an architect choreographs the gradient of penumbra."
    },
    // Page 8: Living Trends
    {
      id: 8,
      type: "trend",
      number: "07",
      category: "LIVING CULTURE",
      title: "THE CONTEMPORARY RETREAT",
      subtitle: "Quiet Luxury in Minimalist Sanctuaries",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
      body: "Clutter-free living has transformed from an aesthetic impulse into a mental wellness imperative. Modern homeowners demand concealed appliances, acoustic damping, and monolithic storage panels that vanish into the perimeter architecture."
    },
    // Page 9: Materials
    {
      id: 9,
      type: "materials",
      number: "08",
      category: "MATERIAL ARCHIVE",
      title: "PALETTE OF TACTILITY",
      subtitle: "Earth, Mineral & Hand-Crafted Metal",
      swatches: [
        { name: "Roman Travertine", origin: "Tivoli, Italy", tone: "#ded3c2" },
        { name: "Charred Shou Sugi Ban", origin: "Nagano, Japan", tone: "#262626" },
        { name: "Patinated Brushed Brass", origin: "Solingen, Germany", tone: "#a38249" },
        { name: "Rammed Clay & Silt", origin: "Oaxaca, Mexico", tone: "#b27357" }
      ],
      body: "Architecture touches the skin. When handrails, thresholds, and worktops carry thermal inertia and honest texture, buildings feel anchored in history rather than disposable fashion."
    },
    // Page 10: Urbanism
    {
      id: 10,
      type: "urban",
      number: "09",
      category: "URBAN HORIZONS",
      title: "VERTICAL BIODIVERSITY",
      subtitle: "The 15-Minute Hyper-Dense Metropolis",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
      stats: [
        { num: "40%", label: "Solar Energy Off-grid" },
        { num: "8,500", label: "Native Tree Canopies" },
        { num: "Zero", label: "Combustion Vehicles" }
      ],
      text: "The high-rise is being reimagined not as an isolated glass monolith, but as an interconnected ecosystem featuring sky bridges, hydroponic farms, and natural wind-scoop ventilation shafts."
    },
    // Page 11: Forecast
    {
      id: 11,
      type: "forecast",
      number: "10",
      category: "2030 OUTLOOK",
      title: "THE NEXT DECADE IN DESIGN",
      subtitle: "Four Pillars Defining Next-Gen Architecture",
      pillars: [
        { title: "01 / Generative Morphology", desc: "AI-assisted structural optimization saves 40% raw steel without compromising load." },
        { title: "02 / Bio-receptive Cladding", desc: "Building envelopes engineered to encourage air-purifying moss and lichen micro-colonies." },
        { title: "03 / Reversible Assembly", desc: "Every component dry-bolted with an open material passport for 100% future deconstruction." },
        { title: "04 / Circadian Illuminance", desc: "Dynamic color temperature and lumens mapped strictly to astronomical solar angles." }
      ]
    },
    // Page 12: Epilogue / Inside Back Cover
    {
      id: 12,
      type: "flyleaf",
      title: "COLOPHON",
      subtitle: "PRINT & PRODUCTION NOTES",
      note: "Set in Freight Big & Neue Haas Grotesk. Printed on 150gsm uncoated Swedish woodfree paper.",
      copyright: "IDC Vanguard Edition № 42"
    },
    // Page 13: Back Cover
    {
      id: 13,
      type: "backcover",
      bgGradient: "from-slate-950 via-zinc-900 to-black",
      quote: "Architecture is the learned game, correct and magnificent, of forms assembled in the light.",
      quoteAuthor: "Le Corbusier",
      brand: "IDC VANGUARD PUBLICATIONS",
      year: "© 2026 IDC STUDIO. ALL RIGHTS RESERVED.",
      isbn: "ISBN 978-0-987654-32-1"
    }
  ]
};
