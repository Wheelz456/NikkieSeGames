import React, { useState, useEffect, useMemo, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// --- Embedded Game Data (The Fail-Safe) ---
const DEFAULT_GAMES = [
  {
    "id": "1",
    "title": "2048 Classic",
    "description": "The addictive puzzle game where you combine numbered tiles to reach 2048.",
    "thumbnail": "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=600",
    "url": "https://play2048.co/",
    "category": "Puzzle",
    "rating": 4.8,
    "plays": "1.2M"
  },
  {
    "id": "2",
    "title": "Hextris",
    "description": "Fast-paced hexagonal block management. Don't let the blocks touch the outer gray hexagon.",
    "thumbnail": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
    "url": "https://hextris.io/",
    "category": "Arcade",
    "rating": 4.5,
    "plays": "850K"
  },
  {
    "id": "3",
    "title": "Flappy Bird",
    "description": "Guide the bird through pipes without hitting them. Simple, yet brutally difficult.",
    "thumbnail": "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=600",
    "url": "https://flappybird.io/",
    "category": "Arcade",
    "rating": 4.2,
    "plays": "2.5M"
  },
  {
    "id": "4",
    "title": "Pac-Man",
    "description": "Eat pellets, dodge ghosts, and clear the maze in this legendary arcade classic.",
    "thumbnail": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
    "url": "https://www.google.com/logos/2010/pacman10-i.html",
    "category": "Arcade",
    "rating": 4.9,
    "plays": "15M"
  },
  {
    "id": "5",
    "title": "Snake",
    "description": "The timeless classic. Eat apples to grow, but don't hit your own tail.",
    "thumbnail": "https://images.unsplash.com/photo-1553481199-65650050cd3e?auto=format&fit=crop&q=80&w=600",
    "url": "https://www.google.com/logos/2010/pacman10-i.html",
    "category": "Arcade",
    "rating": 4.7,
    "plays": "5M"
  },
  {
    "id": "6",
    "title": "Chess",
    "description": "The ultimate game of strategy. Play against the engine or friends unblocked.",
    "thumbnail": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=600",
    "url": "https://lichess.org/export",
    "category": "Strategy",
    "rating": 4.6,
    "plays": "700K"
  }
];

// --- Components ---

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-[#0a0a0c]">
    <nav className="glass-nav sticky top-0 z-50 px-6 py-4">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <i className="fas fa-bolt text-white"></i>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase neon-text">
            Nexus<span className="text-indigo-500">Games</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-white/50 uppercase tracking-widest">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Discover</Link>
          <a href="#" className="hover:text-indigo-400 transition-colors">Popular</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">New</a>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-full text-xs font-black border border-white/10 transition-all uppercase tracking-widest">
          Discord
        </button>
      </div>
    </nav>
    <main className="flex-grow">{children}</main>
    <footer className="border-t border-white/5 py-12 px-6 bg-[#050505]">
      <div className="max-w-screen-2xl mx-auto text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
        <p>© 2025 Nexus Gaming Hub. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

const GameCard: React.FC<{ game: any }> = ({ game }) => (
  <Link 
    to={`/play/${game.id}`}
    className="group relative bg-[#121215] rounded-3xl overflow-hidden aspect-[4/3] border border-white/5 neon-border transition-all duration-500"
  >
    <img src={game.thumbnail} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent flex flex-col justify-end p-6">
      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">{game.category}</span>
      <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors leading-tight">{game.title}</h3>
      <div className="flex items-center gap-4 mt-3 text-[10px] text-white/40 font-bold uppercase tracking-widest">
        <span><i className="fas fa-play text-indigo-500 mr-2"></i>{game.plays}</span>
        <span><i className="fas fa-star text-yellow-500 mr-2"></i>{game.rating}</span>
      </div>
    </div>
  </Link>
);

const HomeView = () => {
  const [games, setGames] = useState(DEFAULT_GAMES);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  useEffect(() => {
    // Try to update from local JSON but keep defaults if it fails
    fetch('./data/games.json')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(() => console.log("Using fail-safe data..."));
  }, []);

  const filtered = useMemo(() => {
    return games.filter(g => 
      (cat === 'All' || g.category === cat) && 
      g.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [games, search, cat]);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <header className="mb-20 text-center">
        <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none neon-text">
          PLAY<br/><span className="text-indigo-500">UNBLOCKED</span>
        </h2>
        <div className="max-w-xl mx-auto relative group">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-500 transition-colors"></i>
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-lg transition-all font-medium placeholder:text-white/10"
            placeholder="Search thousands of games..."
          />
        </div>
      </header>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-10">
        {['All', 'Action', 'Puzzle', 'Arcade', 'Strategy'].map(c => (
          <button 
            key={c}
            onClick={() => setCat(c)}
            className={`px-10 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${cat === c ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/40' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(g => <GameCard key={g.id} game={g} />)}
      </div>
    </div>
  );
};

const PlayView = () => {
  const { id } = useParams();
  const [game, setGame] = useState(DEFAULT_GAMES.find(g => g.id === id));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('./data/games.json')
      .then(res => res.json())
      .then(data => setGame(data.find((g: any) => g.id === id)))
      .catch(() => {});
    window.scrollTo(0,0);
  }, [id]);

  if (!game) return <div className="p-20 text-center text-white/20">Game not found.</div>;

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
        <Link to="/" className="hover:text-white transition-colors">Nexus</Link>
        <i className="fas fa-chevron-right text-[8px] opacity-30"></i>
        <span className="text-indigo-500">{game.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          <div ref={containerRef} className="relative bg-black rounded-[40px] overflow-hidden aspect-video border border-white/5 shadow-2xl">
            <iframe src={game.url} className="w-full h-full border-none" allowFullScreen />
            <div className="absolute bottom-8 right-8 flex gap-4">
              <button 
                onClick={() => containerRef.current?.requestFullscreen()} 
                className="w-14 h-14 bg-black/60 backdrop-blur-xl rounded-2xl hover:bg-indigo-600 transition-all flex items-center justify-center border border-white/10 group"
              >
                <i className="fas fa-expand text-white group-hover:scale-125 transition-transform"></i>
              </button>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h1 className="text-5xl font-black mb-3 tracking-tighter leading-none">{game.title}</h1>
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="text-indigo-400">{game.category}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/40">{game.plays} Plays</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="h-14 px-8 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
                  <i className="fas fa-heart mr-3"></i> Favorite
                </button>
              </div>
            </div>
            <p className="text-white/50 text-xl leading-relaxed max-w-4xl font-medium">{game.description}</p>
          </div>
        </div>
        
        <div className="space-y-8">
          <h4 className="text-xs font-black tracking-[0.3em] uppercase text-indigo-500/50">Developer Info</h4>
          <div className="grid gap-6">
             <div className="p-8 rounded-[32px] bg-indigo-600/10 border border-indigo-500/20">
                <p className="text-[10px] font-black text-indigo-400 mb-4 uppercase tracking-[0.2em]">Game Mode</p>
                <p className="text-sm text-white/80 font-semibold leading-relaxed">This game runs unblocked directly in your browser. No installs required.</p>
             </div>
             <div className="p-8 rounded-[32px] bg-white/5 border border-white/10">
                <p className="text-[10px] font-black text-white/30 mb-4 uppercase tracking-[0.2em]">Performance</p>
                <p className="text-sm text-white/60 font-semibold">Nexus utilizes hardware acceleration for ultra-low latency play.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- App Shell ---
const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/play/:id" element={<PlayView />} />
        <Route path="*" element={<HomeView />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;