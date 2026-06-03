import React, { useState } from 'react';
import { 
  Eye, Clock, Calendar, ExternalLink, 
  Copy, Edit3, Pin, Archive, Trash2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { formatDistanceToNow } from 'date-fns'; 
import { useBookmarks, type Bookmark } from '../context/BookmarkContext';
import { Button } from '../ui/Button';

export function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  
  const { trackVisit, deleteBookmark, togglePin, toggleArchive } = useBookmarks(); 

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(bookmark.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVisit = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackVisit(bookmark.id);
    window.open(bookmark.url, '_blank');
  };

  const handleArchiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleArchive(bookmark.id);
    if (!bookmark.isArchived) {
      navigate('/archive');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md dark:shadow-xl transition-all">
      
      <div className="flex items-start gap-4 mb-3">
        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
          <img 
            src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`}
            className="h-8 w-8"
            alt="icon"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg truncate">{bookmark.title}</h3>
          <p className="text-blue-500 dark:text-blue-400 text-sm truncate">{bookmark.url}</p>

          {bookmark.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[12px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Eye size={14} className="text-slate-400 dark:text-slate-500" />
              <span>{bookmark.viewCount} views</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock size={14} className="text-slate-400 dark:text-slate-500" />
              <span>
                {bookmark.lastVisited 
                  ? `Last visited: ${formatDistanceToNow(new Date(bookmark.lastVisited))} ago` 
                  : 'Never visited'}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-slate-400 dark:text-slate-500" />
              <span>
                Added: {formatDistanceToNow(new Date(bookmark.createdAt))} ago
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
        <Button 
          onClick={handleVisit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
        >
          <ExternalLink size={16} /> Visit
        </Button>

        <button 
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${copied ? 'text-green-600 bg-green-50 dark:text-green-300 dark:bg-green-500/10' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
          onClick={handleCopy}
        >
          <Copy size={16} /> {copied ? 'Copied!' : 'Copy'}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/add/${bookmark.id}`);
          }}
          className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-xl text-sm font-medium transition-colors dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Edit3 size={16} /> Edit
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            togglePin(bookmark.id);
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
            bookmark.isPinned 
              ? 'text-blue-600 bg-orange-50 dark:text-blue-300 dark:bg-blue-500/10' 
              : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800' 
          }`}
        >
          <Pin 
            size={16} 
            fill={bookmark.isPinned ? "currentColor" : "none"} 
          />
          {bookmark.isPinned ? 'Unpin' : 'Pin'}
        </button>

        <button 
          onClick={handleArchiveClick}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
            bookmark.isArchived 
              ? "text-purple-600 bg-purple-50 dark:text-purple-300 dark:bg-purple-500/10" 
              : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          <Archive size={16} />
          {bookmark.isArchived ? 'Unarchive' : 'Archive'}
        </button>

        <button 
          onClick={() => { if(confirm("Sigur doresti sa stergi ?")) deleteBookmark(bookmark.id) }}
          className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors ml-auto dark:text-red-400 dark:hover:bg-red-500/10"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
