
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GAMES } from '../data/games';
import GameCard from '../components/GameCard';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const foundGame = GAMES.find(g => g.id === id);
    if (foundGame) {
      setGame(foundGame);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-white">Game Not Found</h2>
        <Link to="/" className="mt-4 text-indigo-400 hover:underline">Go back home</Link>
      </div>
    );
  }

  const relatedGames = GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-slate-500 text-sm mb-6">
        <Link to="/" className="hover:text-indigo-400">Home</Link>
        <i className="fas fa-chevron-right text-[10px]"></i>
        <span className="hover:text-indigo-400">{game.category}</span>
        <i className="fas fa-chevron-right text-[10px]"></i>
        <span className="text-slate-300 font-semibold">{game.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Game Window */}
          <div className={`relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[60] !rounded-none !border-none' : 'aspect-video'}`}>
            <iframe 
              src={game.url}
              title={game.title}
              className="w-full h-full border-none"
              allow="fullscreen"
            />
            
            {/* Control Bar */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-slate-900/90 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-slate-700 opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100 ${isFullscreen ? '!bottom-8' : ''}`}>
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:text-indigo-400 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
              </button>
              <div className="h-4 w-[1px] bg-slate-700"></div>
              <button className="text-white hover:text-indigo-400 transition-colors" onClick={() => window.location.reload()}>
                <i className="fas fa-redo-alt"></i>
              </button>
              <div className="h-4 w-[1px] bg-slate-700"></div>
              <button className="text-white hover:text-indigo-400 transition-colors">
                <i className="fas fa-share-alt"></i>
              </button>
            </div>
            
            {isFullscreen && (
              <button 
                onClick={() => setIsFullscreen(false)}
                className="absolute top-6 right-6 w-12 h-12 bg-slate-900/80 text-white rounded-full flex items-center justify-center hover:bg-slate-800 border border-slate-700 z-[70]"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          {/* Details */}
          <div className="mt-8 bg-slate-800/40 rounded-3xl p-8 border border-slate-700/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl font-black text-white mb-2">{game.title}</h1>
                <div className="flex items-center space-x-6 text-sm">
                  <span className="flex items-center space-x-2 text-indigo-400 font-bold uppercase tracking-wider">
                    <i className="fas fa-tag"></i>
                    <span>{game.category}</span>
                  </span>
                  <span className="flex items-center space-x-2 text-slate-400">
                    <i className="fas fa-gamepad"></i>
                    <span>{game.plays} plays</span>
                  </span>
                  <div className="flex items-center space-x-1 text-yellow-400 font-bold">
                    <i className="fas fa-star"></i>
                    <span>{game.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 transition-all">
                  <i className="fas fa-heart"></i>
                  <span>Favorite</span>
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-lg shadow-indigo-600/20 transition-all">
                  <i className="fas fa-share"></i>
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-bold text-white mb-4">Description</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                {game.description} Immerse yourself in the addictive world of {game.title}. 
                This browser-based version offers smooth performance and optimized controls. 
                Whether you're taking a quick break or settling in for a long session, 
                this {game.category.toLowerCase()} masterpiece is sure to keep you entertained.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div>
                  <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                    <i className="fas fa-keyboard text-indigo-400"></i>
                    <span>Controls</span>
                  </h4>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex justify-between border-b border-slate-700 py-2">
                      <span>Movement</span>
                      <span className="font-mono text-indigo-300">WASD / Arrows</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-700 py-2">
                      <span>Action</span>
                      <span className="font-mono text-indigo-300">Spacebar</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-700 py-2">
                      <span>Menu</span>
                      <span className="font-mono text-indigo-300">Esc</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                    <i className="fas fa-info-circle text-indigo-400"></i>
                    <span>Information</span>
                  </h4>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex justify-between border-b border-slate-700 py-2">
                      <span>Published</span>
                      <span>Jan 2024</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-700 py-2">
                      <span>Mobile Ready</span>
                      <span className="text-emerald-400">Yes</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-700 py-2">
                      <span>Developer</span>
                      <span>Nexus Community</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-indigo-600 rounded-3xl p-6 shadow-xl shadow-indigo-600/10 text-center">
            <h4 className="text-white font-black text-xl mb-2">PRO UPGRADE</h4>
            <p className="text-indigo-100 text-sm mb-4">Remove all ads and unlock early access to new releases.</p>
            <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors">
              Go Premium
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <i className="fas fa-fire text-orange-500"></i>
              <span>Similar Games</span>
            </h3>
            <div className="space-y-6">
              {relatedGames.map(g => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </div>
          
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6">
            <h4 className="text-white font-bold mb-4">Community Poll</h4>
            <p className="text-slate-400 text-sm mb-4">What should we add next?</p>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-slate-700/50 rounded-xl text-slate-300 text-sm hover:bg-indigo-600 hover:text-white transition-all">
                Multiplayer Modes
              </button>
              <button className="w-full text-left px-4 py-2 bg-slate-700/50 rounded-xl text-slate-300 text-sm hover:bg-indigo-600 hover:text-white transition-all">
                Achievement System
              </button>
              <button className="w-full text-left px-4 py-2 bg-slate-700/50 rounded-xl text-slate-300 text-sm hover:bg-indigo-600 hover:text-white transition-all">
                Game Save Cloud
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
