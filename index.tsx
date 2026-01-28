// --- Nexus Engine Core ---

interface Game {
  id: string;
  title: string;
  category: string;
  plays: string;
  rating: number;
  url: string;
  thumbnail: string;
  description: string;
}

const DEFAULT_LIBRARY: Game[] = [
  {
    id: "1",
    title: "2048 Classic",
    category: "Puzzle",
    plays: "2.1M",
    rating: 4.8,
    url: "https://play2048.co/",
    thumbnail: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800",
    description: "Combine tiles to reach the legendary 2048 in this highly addictive logic puzzle."
  },
  {
    id: "2",
    title: "Hextris",
    category: "Arcade",
    plays: "950K",
    rating: 4.5,
    url: "https://hextris.io/",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    description: "Rotate the central hexagon to catch falling blocks and clear lines in this fast-paced arcade game."
  },
  {
    id: "3",
    title: "Snake Royale",
    category: "Action",
    plays: "5.4M",
    rating: 4.7,
    url: "https://www.google.com/logos/2010/pacman10-i.html",
    thumbnail: "https://images.unsplash.com/photo-1553481199-65650050cd3e?auto=format&fit=crop&q=80&w=800",
    description: "The timeless snake classic. Eat to grow longer, avoid your own tail and the walls."
  },
  {
    id: "4",
    title: "Retro Maze",
    category: "Arcade",
    plays: "12.5M",
    rating: 4.9,
    url: "https://www.google.com/logos/2010/pacman10-i.html",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    description: "Eat all the pellets in the maze while avoiding the ghosts in this retro masterpiece."
  },
  {
    id: "5",
    title: "Chess Master",
    category: "Strategy",
    plays: "150K",
    rating: 4.6,
    url: "https://lichess.org/export",
    thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800",
    description: "Master the board in the ultimate game of high-level strategy and tactics."
  },
  {
    id: "6",
    title: "Flappy Bird",
    category: "Action",
    plays: "3.2M",
    rating: 4.3,
    url: "https://flappybird.io/",
    thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=800",
    description: "One-button gameplay at its most frustratingly brilliant. How far can you fly?"
  }
];

// --- State Management ---
let games: Game[] = DEFAULT_LIBRARY;
let favorites: string[] = JSON.parse(localStorage.getItem('nexus_favs_vanilla') || '[]');
let currentSearch = '';
let activeCategory = 'All';

// --- Storage Logic ---
const saveFavs = () => localStorage.setItem('nexus_favs_vanilla', JSON.stringify(favorites));

const toggleFavorite = (id: string) => {
  if (favorites.includes(id)) {
    favorites = favorites.filter(fid => fid !== id);
  } else {
    favorites.push(id);
  }
  saveFavs();
  render(); // Re-render to update heart states
};

// --- Templates ---
const GameCardTemplate = (game: Game) => {
  const isFav = favorites.includes(game.id);
  return `
    <div class="group relative bg-[#111] rounded-[32px] overflow-hidden aspect-[4/5] border border-white/5 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
      <button 
        onclick="window.nexus.toggleFavorite('${game.id}')"
        class="absolute top-5 right-5 z-20 w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-xl transition-all active:scale-90 ${isFav ? 'bg-indigo-600 text-white shadow-lg' : 'bg-black/40 text-white/60 border border-white/10 hover:bg-black/60'}"
      >
        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
      </button>
      <a href="#/play/${game.id}" class="block h-full">
        <div class="absolute inset-0">
          <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 p-8">
          <span class="inline-block px-3 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/20 text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-3">${game.category}</span>
          <h3 class="text-2xl font-black text-white leading-tight mb-2 uppercase tracking-tighter italic">${game.title}</h3>
          <div class="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest">
            <span><i class="fas fa-play text-indigo-500 mr-2"></i>${game.plays}</span>
            <span><i class="fas fa-star text-yellow-500 mr-2"></i>${game.rating}</span>
          </div>
        </div>
      </a>
    </div>
  `;
};

const HomeViewTemplate = () => {
  const filtered = games.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(currentSearch.toLowerCase());
    if (activeCategory === 'Favorites') return favorites.includes(g.id) && matchesSearch;
    if (activeCategory === 'All') return matchesSearch;
    return g.category === activeCategory && matchesSearch;
  });

  const cats = ['All', 'Favorites', 'Action', 'Puzzle', 'Arcade', 'Strategy'];

  return `
    <div class="max-w-screen-2xl mx-auto px-6 py-12">
      <header class="mb-20 text-center">
        <h1 class="text-6xl md:text-[10rem] font-black mb-10 tracking-tighter uppercase italic leading-none opacity-90">
          PLAY<br/><span class="text-indigo-600">UNBOUND.</span>
        </h1>
        <div class="max-w-2xl mx-auto relative group">
          <i class="fas fa-search absolute left-8 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-indigo-500 transition-colors"></i>
          <input 
            type="text" 
            placeholder="Search our unblocked library..." 
            oninput="window.nexus.setSearch(this.value)" 
            value="${currentSearch}"
            class="w-full h-20 bg-white/5 border border-white/10 rounded-full pl-20 pr-10 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-white/10"
          />
        </div>
      </header>

      <div class="flex gap-4 overflow-x-auto no-scrollbar pb-10 mb-12 border-b border-white/5">
        ${cats.map(cat => `
          <button 
            onclick="window.nexus.setCategory('${cat}')"
            class="px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${activeCategory === cat ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/30' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10'}"
          >${cat}</button>
        `).join('')}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        ${filtered.length > 0 ? filtered.map(GameCardTemplate).join('') : `
          <div class="col-span-full py-40 text-center text-white/20">
            <i class="fas fa-ghost text-4xl mb-4"></i>
            <h3 class="text-2xl font-black uppercase tracking-widest">No Signal Found</h3>
          </div>
        `}
      </div>
    </div>
  `;
};

const PlayViewTemplate = (id: string) => {
  const game = games.find(g => g.id === id);
  if (!game) return `<div class="p-40 text-center uppercase font-black tracking-[0.5em] text-white/20">Portal Error</div>`;

  const isFav = favorites.includes(game.id);

  return `
    <div class="max-w-screen-2xl mx-auto px-6 py-12">
      <div class="flex items-center gap-4 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
        <a href="#/" class="hover:text-white transition-colors">Portal</a>
        <i class="fas fa-chevron-right text-[8px] opacity-30"></i>
        <span class="text-indigo-500">${game.title}</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div class="lg:col-span-3 space-y-12">
          <div class="relative bg-black aspect-video rounded-[48px] overflow-hidden border border-white/5 shadow-2xl group">
            <iframe src="${game.url}" class="w-full h-full border-none" allowfullscreen></iframe>
            <div class="absolute bottom-10 right-10 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onclick="this.parentElement.parentElement.requestFullscreen()" class="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all text-white">
                <i class="fas fa-expand text-xl"></i>
              </button>
            </div>
          </div>
          <div class="p-12 bg-white/5 rounded-[48px] border border-white/5">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 class="text-6xl font-black mb-4 tracking-tighter leading-none uppercase italic">${game.title}</h1>
                <div class="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span class="text-indigo-400">${game.category}</span>
                  <span class="text-white/40"><i className="fas fa-play text-indigo-500 mr-2"></i>${game.plays} Plays</span>
                  <span class="text-yellow-500"><i className="fas fa-star mr-2"></i>${game.rating} Rating</span>
                </div>
              </div>
              <button 
                onclick="window.nexus.toggleFavorite('${game.id}')"
                class="h-16 px-10 border border-white/10 rounded-2xl flex items-center gap-4 transition-all ${isFav ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'bg-white/5 hover:bg-white/10 text-white'}"
              >
                <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                <span class="text-[10px] font-black uppercase tracking-widest">${isFav ? 'Saved' : 'Favorite'}</span>
              </button>
            </div>
            <p class="text-xl text-white/50 leading-relaxed font-medium">${game.description}</p>
          </div>
        </div>
        <aside class="space-y-12">
          <div class="p-10 rounded-[40px] bg-indigo-600/10 border border-indigo-500/20">
            <h4 class="text-[10px] font-black text-indigo-400 mb-4 uppercase tracking-widest">Nexus Status</h4>
            <p class="text-sm text-white/60 leading-relaxed font-medium">Session secured via unblocked tunnel.</p>
          </div>
        </aside>
      </div>
    </div>
  `;
};

// --- Core Engine Functions ---
const render = () => {
  const container = document.getElementById('view-container');
  if (!container) return;

  container.classList.remove('view-active');
  
  setTimeout(() => {
    const hash = window.location.hash || '#/';
    
    if (hash.startsWith('#/play/')) {
      const id = hash.replace('#/play/', '');
      container.innerHTML = PlayViewTemplate(id);
    } else {
      container.innerHTML = HomeViewTemplate();
    }
    
    container.classList.add('view-active');
  }, 50);
};

// --- Public API for HTML Events ---
(window as any).nexus = {
  setSearch: (val: string) => { currentSearch = val; render(); },
  setCategory: (val: string) => { activeCategory = val; render(); },
  toggleFavorite: (id: string) => toggleFavorite(id),
};

// --- Initial Launch ---
const init = async () => {
  try {
    const res = await fetch('./data/games.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) games = data;
    }
  } catch (e) { console.warn("Using defaults."); }
  
  window.addEventListener('hashchange', render);
  render();
};

init();
