import React, { useState, useMemo } from 'react';
import { GAMES } from '../data/games';
import GameCard from '../components/GameCard';

const CATEGORIES = ['All', 'Action', 'Puzzle', 'Arcade', 'Sports', 'Strategy', 'Adventure'];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-12">
      <section className="relative rounded-3xl overflow-hidden bg-indigo-600 mb-12 shadow-2xl shadow-indigo-500/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        <div className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            UNLEASH THE <span className="text-indigo-200 underline decoration-indigo-300">GAMER</span> WITHIN
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl mb-8 font-medium">
            Explore thousands of unblocked games.
          </p>
          <div className="w-full max-w-xl relative group">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"></i>
            <input 
              type="text" 
              placeholder="Search for a game..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-slate-900 font-medium shadow-xl border-2 border-transparent focus:border-indigo-400 focus:outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border-2 ${
              selectedCategory === cat 
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
              : 'bg-slate-800 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      
      {filteredGames.length === 0 && (
        <div className="py-20 text-center text-slate-400">
          No games found matching your search.
        </div>
      )}
    </div>
  );
};

export default Home;