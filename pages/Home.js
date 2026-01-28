
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
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-indigo-600 mb-12 shadow-2xl shadow-indigo-500/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        <div className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            UNLEASH THE <span className="text-indigo-200 underline decoration-indigo-300">GAMER</span> WITHIN
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl mb-8 font-medium">
            Explore thousands of unblocked games. No downloads, no lag, just pure gaming fun directly in your browser.
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

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
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
        
        <div className="flex items-center space-x-4 text-slate-400 text-sm font-medium bg-slate-800/50 p-1.5 rounded-xl border border-slate-700">
          <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg shadow-sm">Popular</button>
          <button className="px-4 py-1.5 hover:text-white transition-colors">Latest</button>
          <button className="px-4 py-1.5 hover:text-white transition-colors">Top Rated</button>
        </div>
      </div>

      {/* Game Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-white flex items-center space-x-3">
            <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
            <span>{selectedCategory} Games</span>
          </h2>
          <span className="text-slate-500 text-sm font-semibold uppercase tracking-widest">{filteredGames.length} Games Found</span>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-800/30 rounded-3xl border-2 border-dashed border-slate-700">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600 text-4xl">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
            <p className="text-slate-400 text-center max-w-md">
              We couldn't find any games matching "{searchQuery}" in the {selectedCategory} category. Try a different search!
            </p>
          </div>
        )}
      </div>

      {/* Feature Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center text-xl mb-6">
            <i className="fas fa-bolt"></i>
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Instant Play</h4>
          <p className="text-slate-400">Jump right into action with zero loading screens. Optimized for fast browser performance.</p>
        </div>
        <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50">
          <div className="w-12 h-12 bg-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center text-xl mb-6">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Safe & Secure</h4>
          <p className="text-slate-400">All games are thoroughly vetted for safety and high-quality gameplay standards.</p>
        </div>
        <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50">
          <div className="w-12 h-12 bg-indigo-500/20 text-indigo-500 rounded-2xl flex items-center justify-center text-xl mb-6">
            <i className="fas fa-infinity"></i>
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Forever Free</h4>
          <p className="text-slate-400">Access our entire library without any subscription or hidden fees. Always free to play.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
