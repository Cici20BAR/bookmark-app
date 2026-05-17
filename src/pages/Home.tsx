import { Search, Filter, ChevronDown } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { BookmarkCard } from "../components/BookmarkCard";

export function Home() {
  const { searchTerm, setSearchTerm, selectedTag, setSelectedTag, filteredBookmarks } = useBookmarks();
  
  return (
    <div className="max-w-7xl w-full mx-auto space-y-8 py-8 px-4">

      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          My Bookmarks:
        </h1>
      </div>

      <div className="py-2">
        <span className="text-blue-500 font-bold">{filteredBookmarks.length}</span>
        <span className="text-slate-500 dark:text-slate-400 ml-2">bookmarks found</span>
      </div>

      <div className="flex flex-col gap-4">

        <div className="relative w-full">

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search size={18} />
          </div>

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search bookmark by title, url or tags"
            type="text"
            className="w-full pl-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-2 border-slate-300 dark:border-slate-700 rounded-2xl py-4 focus:border-blue-500 focus:outline-none transition-colors duration-300"
          />

        </div>

        <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white w-fit ml-1.5 transition-colors duration-300">
          <Filter size={18} />
          <span>Filter</span>
        </button>

        <div className="relative w-full">

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 pl-4 pr-10 py-3 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="social">Social</option>
          </select>

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <ChevronDown size={16} />
          </div>

        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((bookmark) => (
              <BookmarkCard 
                key={bookmark.id} 
                bookmark={bookmark} 
              />
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors duration-300">
              <p className="text-slate-500 dark:text-slate-400">No bookmarks found matching your search.</p>
            </div>
          )}
        </div>
        
      </div>

    </div>
  );
}
