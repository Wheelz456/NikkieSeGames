
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
              <i className="fas fa-gamepad text-xl text-white"></i>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              NEXUS<span className="text-indigo-500">GAMES</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-white font-medium transition-colors">Home</Link>
            <Link to="/" className="text-slate-300 hover:text-white font-medium transition-colors">Popular</Link>
            <Link to="/" className="text-slate-300 hover:text-white font-medium transition-colors">New</Link>
            <Link to="/" className="text-slate-300 hover:text-white font-medium transition-colors">Categories</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-slate-400 hover:text-white md:hidden">
              <i className="fas fa-search"></i>
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20">
              Join Discord
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-gamepad text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-white">NEXUSGAMES</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              The best destination for unblocked web games. High-speed performance, clean UI, and curated content for gamers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-all">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-all">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
              <li><a href="#" className="hover:text-indigo-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-indigo-400">Action</a></li>
              <li><a href="#" className="hover:text-indigo-400">Puzzle</a></li>
              <li><a href="#" className="hover:text-indigo-400">Arcade</a></li>
              <li><a href="#" className="hover:text-indigo-400">Sports</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Nexus Games Portal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
