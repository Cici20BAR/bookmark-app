import React from 'react';
import {  Archive, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import { BookmarkCard } from '../components/BookmarkCard';

export function ArchivePage(){
    const { archivedBookmarks,  setBookmarks } = useBookmarks();

  const handleRestoreAll = () => {
    if (archivedBookmarks.length === 0) return;
    
    if (confirm("Vrei sa restaurezi toate bookmark-urile in lista principala?")) {
      setBookmarks((prev:any) => 
        prev.map((b:any)=> ({ ...b, isArchived: false }))
      );
    }
  };

  return(
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
            <Archive size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Arhiva</h1>
            <p className="text-slate-300 text-sm">
                Ai <span className="text-purple-400 font-bold">{archivedBookmarks.length}</span> elemente arhivate
            </p>

          </div>
        </div>
        {archivedBookmarks.length > 0 && (
          <button 
            onClick={handleRestoreAll}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl text-sm font-medium transition-all border border-slate-700 shadow-sm"
          >
            <RotateCcw size={16} />
            Restore All
          </button>
        )}
        <div className="grid grid-cols-1 gap-4">
            {archivedBookmarks.length>0 ?(
                archivedBookmarks.map((b)=>(
                    <BookmarkCard key={b.id} bookmark={b} />

                )
                )

            ):(
                <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 text-slate-600">
              <Archive size={40} />
            </div>
            <h3 className="text-xl font-semibold text-slate-300">Nimic în arhiva</h3>
            <p className="text-slate-500 max-w-xs mt-2 text-sm">
              Aici vor aparea bookmark-urile pe care alegi sa le ascunzi din lista principala.
            </p>
            <Link 
              to="/" 
              className="mt-6 px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all font-medium text-sm"
            >
              Înapoi la Home
            </Link>
          </div>
            )}
        </div>
    </div>
    </div>

  )
}