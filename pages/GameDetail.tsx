import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGames } from '../data/games';
import GameCard from '../components/GameCard.tsx';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const iframeContainerRef = useRef(null);

  useEffect(() => {
    const loadGameData = async () => {
      try {
        setLoading(true);
        const data = await fetchGames();
        const foundGame = data.find(g => g.id === id);
        if (foundGame) {
          setGame(foundGame);
          setRelatedGames(data.filter(g => g.category === foundGame.category && g.id !== foundGame.id).slice(0, 4));
        }
      } catch (err) {
        console.error("Error loading game detail:", err);
      } finally {
        setLoading(false);
      }
    };
    loadGameData();
    window.scrollTo(0, 0);
  }, [id]);

  const toggleFullscreen = () => {
    if (!iframeContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      iframeContainerRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <h2 className="text-2xl font-bold">Game Not Found</h2>
        <Link to="/" className="mt-4 text-indigo-400 hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <div className="flex items-center space-x-2 text-slate-500 text-sm mb-6">
        <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
        <i className="fas fa-chevron-right text-[10px]"></i>
        <span className="text-slate-300 font-semibold">{game.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div 
            ref={iframeContainerRef}
            className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl aspect-video group"
          >
            <iframe 
              src={game.url}
              title={game.title}
              className="w-full h-full border-none"
              allow="fullscreen; autoplay; encrypted-media"
            />
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={toggleFullscreen}
                className="bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-xl border border-slate-700 hover:bg-indigo-600 transition-all shadow-xl"
                title="Fullscreen"
              >
                <i className="fas fa-expand"></i>
              </button>
            </div>
          </div>
          
          <div className="mt-8 bg-slate-800/40 rounded-3xl p-8 border border-slate-700/50">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-black text-white mb-2">{game.title}</h1>
                <div className="flex items-center space-x-4">
                   <span className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-lg text-sm font-bold border border-indigo-500/20">
                    {game.category}
                  </span>
                  <div className="flex items-center text-yellow-400 space-x-1">
                    <i className="fas fa-star"></i>
                    <span className="font-bold">{game.rating}</span>
                  </div>
                  <div className="text-slate-500 text-sm font-medium">
                    <i className="fas fa-play mr-2"></i>
                    {game.plays} Plays
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition-all">
                  <i className="fas fa-heart mr-2"></i> Favorite
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
                  Share
                </button>
              </div>
            </div>
            <div className="h-px bg-slate-700/50 w-full mb-6"></div>
            <h3 className="text-white font-bold text-lg mb-3">About {game.title}</h3>
            <p className="text-slate-400 text-lg leading-relaxed">{game.description}</p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-bold text-white flex items-center">
            <span className="w-1.5 h-6 bg-indigo-500 rounded-full mr-3"></span>
            Related Games
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {relatedGames.map(g => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
          {relatedGames.length === 0 && (
            <p className="text-slate-500 text-sm italic">No other games in this category yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
