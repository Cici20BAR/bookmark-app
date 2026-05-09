import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-7xl w-full mx-auto space-y-8 py-8">

      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <h1 className="text-3xl font-bold text-white mb-2">
          My Bookmarks:
        </h1>
      </div>

      <div className="px-4 py-2">
        <span className="text-blue-500 font-bold">12</span>
        <span className="text-slate-400 ml-2">bookmarks found</span>
      </div>

      <div className="flex flex-col gap-4">

        <div className="relative w-full">

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search size={18} />
          </div>

          <input
            placeholder="search bookmark by title, url or tags"
            type="text"
            className="w-full pl-10 border-2 border-slate-600 rounded-2xl py-4 
                       focus:border-blue-500 focus:outline-none"
          />

        </div>

        <button className="flex items-center gap-2 text-slate-400 hover:text-white w-fit ml-1.5">
          <Filter size={18} />
          <span>Filter</span>
        </button>

        <div className="relative w-full">

          <select
            className="appearance-none bg-slate-900 border border-slate-800 text-slate-300
                       pl-4 pr-10 py-3 rounded-2xl cursor-pointer
                       hover:bg-slate-800 transition-all
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="social">Social</option>
          </select>

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
            <ChevronDown size={16} />
          </div>

        </div>

      </div>

    </div>
  );
}