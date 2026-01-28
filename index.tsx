import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

// --- Data Constants ---
const GAME_LIBRARY = [
  {
    id: "1",
    title: "2048 Classic",
    category: "Puzzle",
    plays: "2.1M",
    rating: 4.8,
    url: "https://play2048.co/",
    thumbnail: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800",
    description: "Combine tiles to reach 2048 in this legendary puzzle game. A perfect test of logic and strategy."
  },
  {
    id: "2",
    title: "Hextris",
    category: "Arcade",
    plays: "950K",
    rating: 4.5,
    url: "https://hextris.io/",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    description: "Rotate the hexagon to clear lines and prevent blocks from reaching the outer edge."
  },
  {
    id: "3",
    title: "Snake Royale",
    category: "Action",
    plays: "5.4M",
    rating: 4.7,
    url: "https://www.google.com/logos/2010/pacman10-i.html",
    thumbnail: "https://images.unsplash.com/photo-1553481199-65650050cd3e?auto=format&fit=crop&q=80&w=800",
    description: "The definitive snake experience. Eat to grow, avoid your tail."
  },
  {
    id: "4",
    title: "Retro Maze",
    category: "Arcade",
    plays: "12.5M",
    rating: 4.9,
    url: "https://www.google.com/logos/2010/pacman10-i.html",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    description: "The classic pellet-eating maze game. Dodge ghosts and aim for the high score!"
  },
  {
    id: "5",
    title: "Chess Master",
    category: "Strategy",
    plays: "150K",
    rating: 4.6,
    url: "https://lichess.org/export",
    thumbnail: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800",
    description: "Sharpen your mind with the ultimate game of strategy. Play against an advanced engine or friends."
  },
  {
    id: "6",
    title: "Flappy Bird",
    category: "Action",
    plays: "3.2M",
    rating: 4.3,
    url: "https://flappybird.io/",
    thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=800",
    description: "Navigate the bird through the green pipes in this brutally difficult classic."
  },
  {
    id: "7",
    title: "Doodle Jump",
    category: "Arcade",
    plays: "1.8M",
    rating: 4.6,
    url: "https://doodlejump.io/",
    thumbnail: "https://images.unsplash.com/photo-1551817958-c1995896c2c3?auto=format&fit=crop&q=80&w=800",
    description: "Jump from platform to platform in this endless vertical climber. Use power-ups to reach new heights!"
  },
  {
    id: "8",
    title: "Paper.io 2",
    category: "Strategy",
    plays: "8.9M",
    rating: 4.7,
    url: "https://paper-io.com/",
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
    description: "Capture territory by drawing loops. Don't let others hit your tail!"
  }
];

const CATEGORIES = ['All', 'Favorites', 'Action', 'Puzzle', 'Arcade', 'Strategy'];

// --- Components ---

const Navbar: React.FC = () => (
  <nav className="sticky top-0 z-[100] bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 py-4 px-6">
    <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform group-hover:scale-110">
          <i className="fas fa-gamepad text-white"></i>
        </div>
        <span className="text-xl font-black tracking-tighter uppercase italic">
          NEXUS<span className="text-indigo-500">PLAY</span>
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-10 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
        <Link to="/" className="hover:text-white transition-colors">Portal</Link>
        <a href="#" className="hover:text-white transition-colors">Trending</a>
        <a href="#" className="hover:text-white transition-colors">Community</a>
      </div>
      <button className="bg-white/5 hover:bg-indigo-600 text-white border border-white/10 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
        Discord
      </button>
    </div>
  </nav>
);

const GameCard: React.FC<{ game: any; isFavorited: boolean; onToggleFavorite: (id: string) => void }> = ({ game, isFavorited, onToggleFavorite }) => (
  <div className="group relative bg-[#111] rounded-[32px] overflow-hidden aspect-[4/5] border border-white/5 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
    <button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite(game.id);
      }}
      className={`absolute top-6 right-6 z-20 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${
        isFavorited 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' 
          : 'bg-black/40 text-white/60 border border-white/10 hover:bg-black/60 hover:text-white'
      }`}
    >
      <i className={`${isFavorited ? 'fas' : 'far'} fa-heart`}></i>
    </button>
    
    <Link to={`/play/${game.id}`} className="block h-full">
      <div className="absolute inset-0">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 transform group-hover:-translate-y-2 transition-transform duration-500">
        <span className="inline-block px-3 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-3">
          {game.category}
        </span>
        <h3 className="text-2xl font-black text-white leading-tight mb-2 uppercase tracking-tight">{game.title}</h3>
        <div className="flex items-center gap-4 text-[9px] font-bold text-white/40 uppercase tracking-widest">
          <span><i className="fas fa-play text-indigo-500 mr-2"></i>{game.plays}</span>
          <span><i className="fas fa-star text-yellow-500 mr-2"></i>{game.rating}</span>
        </div>
      </div>
    </Link>
  </div>
);

const HomeView: React.FC<{ games: any[]; favorites: string[]; onToggleFavorite: (id: string) => void }> = ({ games, favorites, onToggleFavorite }) => {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const filtered = useMemo(() => {
    return games.filter(g => {
      const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase());
      if (activeCat === 'Favorites') {
        return matchesSearch && favorites.includes(g.id);
      }
      return (activeCat === 'All' || g.category === activeCat) && matchesSearch;
    });
  }, [games, search, activeCat, favorites]);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12 animate-in">
      <header className="mb-20 text-center">
        <h1 className="text-6xl md:text-[10rem] font-black mb-8 tracking-tighter italic uppercase leading-none opacity-90">
          LEVEL<br/><span className="text-indigo-600">UP.</span>
        </h1>
        <div className="max-w-2xl mx-auto relative group">
          <i className="fas fa-search absolute left-8 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-indigo-500 transition-colors"></i>
          <input 
            type="text"
            placeholder="Search thousands of unblocked games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-20 bg-white/5 border border-white/10 rounded-full pl-20 pr-10 text-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-white/10"
          />
        </div>
      </header>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-10 mb-8 border-b border-white/5">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${
              activeCat === cat 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/30' 
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            isFavorited={favorites.includes(game.id)} 
            onToggleFavorite={onToggleFavorite} 
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-40 text-center text-white/20">
            <i className={`fas ${activeCat === 'Favorites' ? 'fa-heart-broken' : 'fa-search-minus'} text-4xl mb-4`}></i>
            <h3 className="text-2xl font-black uppercase tracking-widest">
              {activeCat === 'Favorites' ? "You haven't favorited any games yet" : "No games found"}
            </h3>
            {activeCat === 'Favorites' && (
              <button 
                onClick={() => setActiveCat('All')}
                className="mt-6 text-indigo-500 font-bold uppercase tracking-widest text-xs hover:underline"
              >
                Go find some favorites
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const PlayView: React.FC<{ games: any[]; favorites: string[]; onToggleFavorite: (id: string) => void }> = ({ games, favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const game = useMemo(() => games.find(g => g.id === id), [games, id]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isFavorited = game ? favorites.includes(game.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!game) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
      <h2 className="text-4xl font-black text-white/20 uppercase tracking-widest">Game Not Found</h2>
      <Link to="/" className="text-indigo-500 font-bold uppercase tracking-widest text-xs hover:underline">Return to Portal</Link>
    </div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12 animate-in">
      <div className="flex items-center gap-4 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
        <Link to="/" className="hover:text-white transition-colors">Portal</Link>
        <i className="fas fa-chevron-right text-[8px] opacity-30"></i>
        <span className="text-indigo-500">{game.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-12">
          <div 
            ref={containerRef}
            className="relative bg-black aspect-video rounded-[48px] overflow-hidden border border-white/5 shadow-2xl group"
          >
            <iframe 
              src={game.url} 
              title={game.title}
              className="w-full h-full border-none"
              allowFullScreen
            />
            <div className="absolute bottom-10 right-10 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onToggleFavorite(game.id)}
                className={`w-16 h-16 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center transition-all ${
                  isFavorited ? 'bg-indigo-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <i className={`${isFavorited ? 'fas' : 'far'} fa-heart text-xl`}></i>
              </button>
              <button 
                onClick={() => containerRef.current?.requestFullscreen()}
                className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all text-white"
              >
                <i className="fas fa-expand text-xl"></i>
              </button>
            </div>
          </div>
          <div className="p-12 bg-white/5 rounded-[48px] border border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-6xl font-black mb-4 tracking-tighter leading-none uppercase italic">{game.title}</h1>
                <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="text-indigo-400">{game.category}</span>
                  <span className="text-white/40"><i className="fas fa-play text-indigo-500 mr-2"></i>{game.plays} Plays</span>
                  <span className="text-yellow-500"><i className="fas fa-star mr-2"></i>{game.rating}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => onToggleFavorite(game.id)}
                  className={`h-16 px-10 border border-white/10 rounded-2xl flex items-center gap-4 transition-all ${
                    isFavorited 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' 
                      : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  <i className={`${isFavorited ? 'fas' : 'far'} fa-heart`}></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">{isFavorited ? 'Saved' : 'Favorite'}</span>
                </button>
              </div>
            </div>
            <p className="text-xl text-white/50 leading-relaxed font-medium">{game.description}</p>
          </div>
        </div>
        <aside className="space-y-12">
          <div className="p-10 rounded-[40px] bg-indigo-600/10 border border-indigo-500/20">
            <h4 className="text-[10px] font-black text-indigo-400 mb-4 uppercase tracking-widest">Nexus Status</h4>
            <p className="text-sm text-white/60 leading-relaxed">Fast-load enabled. This session is running on the high-performance unblocked cloud.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white/20 mb-8 uppercase tracking-[0.3em]">Similar Plays</h4>
            <div className="grid gap-6">
              {games.filter(g => g.category === game.category && g.id !== game.id).slice(0, 3).map(r => (
                <Link key={r.id} to={`/play/${r.id}`} className="flex gap-5 group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={r.thumbnail} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="py-2">
                    <h5 className="font-black text-sm text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{r.title}</h5>
                    <p className="text-[9px] text-white/20 uppercase font-black mt-1">{r.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [games, setGames] = useState(GAME_LIBRARY);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('nexus-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nexus-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fid => fid !== id) 
        : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data/games.json');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setGames(data);
          }
        }
      } catch (err) {
        console.warn("External data failed, using embedded library.");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#050505] gap-8">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] animate-pulse">Syncing Nexus...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#050505]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<HomeView games={games} favorites={favorites} onToggleFavorite={toggleFavorite} />} 
            />
            <Route 
              path="/play/:id" 
              element={<PlayView games={games} favorites={favorites} onToggleFavorite={toggleFavorite} />} 
            />
            <Route 
              path="*" 
              element={<HomeView games={games} favorites={favorites} onToggleFavorite={toggleFavorite} />} 
            />
          </Routes>
        </main>
        <footer className="py-20 px-6 border-t border-white/5 bg-[#080808] text-center">
          <div className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
            © 2025 NEXUSPLAY NETWORKS. ALL CONTENT CURATED & UNBLOCKED.
          </div>
        </footer>
      </div>
    </Router>
  );
};

// Start
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
