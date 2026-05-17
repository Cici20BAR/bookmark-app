import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';
import { Sun, Moon, Trash2 } from 'lucide-react';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { bookmarks, deleteAllBookmarks } = useBookmarks();

  const handleDeleteAll = () => {
    if (bookmarks.length === 0) return;

    if (confirm("Sigur vrei sa stergi toate bookmark-urile?")) {
      deleteAllBookmarks();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold dark:text-white text-slate-800">Setari Aplicatie</h1>
      
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Tema interfata</span>
        
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${theme === 'light' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Sun size={16} /> Light
          </button>
          
          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${theme === 'dark' ? 'bg-slate-800 text-purple-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Moon size={16} /> Dark
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div>
          <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Sterge toate bookmark-urile
          </span>
          <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1">
            {bookmarks.length} bookmark-uri salvate
          </span>
        </div>

        <button
          type="button"
          onClick={handleDeleteAll}
          disabled={bookmarks.length === 0}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
        >
          <Trash2 size={16} />
          Delete All
        </button>
      </div>
    </div>
  );
}
