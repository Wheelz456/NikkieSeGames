
import React from 'react';
import { Link } from 'react-router-dom';

// Added React.FC type to the component definition to ensure that React-specific props like 'key' are handled correctly when rendering in lists
const GameCard: React.FC<{ game: any }> = ({ game }) => {
  return (
    <Link 
      to={`/game/${game.id}`}
      className="group block bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1 border border-slate-700">
          <i className="fas fa-star text-yellow-400 text-xs"></i>
          <span className="text-xs font-bold text-white">{game.rating}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
          {game.title}
        </h3>
        <div className="flex items-center space-x-3 text-xs text-slate-400 font-medium uppercase tracking-wider mt-2">
          <span className="bg-slate-700/50 px-2 py-0.5 rounded border border-slate-600">{game.category}</span>
          <span className="flex items-center space-x-1">
            <i className="fas fa-play text-[10px]"></i>
            <span>{game.plays} plays</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
