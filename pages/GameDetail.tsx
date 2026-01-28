
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
      <div className="flex items-center space-x-2 text-slate-500 text-sm mb-6">
        <Link to="/" className="hover:text-indigo-400">Home</Link>
        <i className="fas fa-chevron-right text-[10px]"></i>
        <span className="hover:text-indigo-400">{game.category}</span>
        <i className="fas fa-chevron-right text-[10px]"></i>
        <span className="text-slate-300 font-semibold">{game.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className={`relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[60] !rounded-none !border-none' : 'aspect-video'}`}>
            <iframe 
              src={game.url}
              title={game.title}
              className="w-full h-full border-none"
              allow="fullscreen"
            />
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-slate-900/90 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-slate-700">
              <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-white hover:text-indigo-400 transition-colors">
                <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
              </button>
            </div>
          </div>

          <div className="mt-8 bg-slate-800/40 rounded-3xl p-8 border border-slate-700/50">
            <h1 className="text-4xl font-black text-white mb-2">{game.title}</h1>
            <p className="text-slate-400 text-lg leading-relaxed mt-4">{game.description}</p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-bold text-white mb-6">Related Games</h3>
          <div className="space-y-6">
            {relatedGames.map(g => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
