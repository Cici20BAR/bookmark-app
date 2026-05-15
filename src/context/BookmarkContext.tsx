import { useContext, createContext, useState, type ReactNode, useMemo } from 'react';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  tags: string[]; 
  isPinned:boolean;
  viewCount:number;
  lastVisited?:string;
  createdAt: string;
isArchived: boolean; 

}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (dateFormular: any) => void; 
  deleteBookmark:(date:any)=>void;
  filteredBookmarks: Bookmark[]; 
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedTag: string;
  setSelectedTag: (val: string) => void;
  trackVisit: (id: string) => void; 
  archivedBookmarks: Bookmark[];
  
togglePin:(id:string)=>void;
toggleArchive:(id:string)=>void;
setBookmarks:(data:any)=>void;


}

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

const archivedBookmarks = useMemo(() => {
    return bookmarks.filter(b => b.isArchived);
  }, [bookmarks]);
  const filteredBookmarks = useMemo(() => {
  const search = searchTerm.toLocaleLowerCase();

  const filtered = bookmarks.filter((b) => {
      if (b.isArchived) return false;
    const isInTitle = b.title.toLocaleLowerCase().includes(search);
    const isInUrl = b.url.toLocaleLowerCase().includes(search);
    const isInDescription = b.description?.toLocaleLowerCase().includes(search) ?? false;
    const isInTags = b.tags?.some(t => t.toLocaleLowerCase().includes(search)) ?? false;

    const matchesSearch = isInTitle || isInUrl || isInDescription || isInTags;

    const matchesTag = selectedTag === 'all' || b.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return [...filtered].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });

}, [bookmarks, searchTerm, selectedTag]);
  const addBookmark = (dateFormular: Omit<Bookmark,'id'|'isPinned'|'createdAt'|'viewCount'|'tags'|'isArchived'>) => {
    const bookmarkNou = {
      id: crypto.randomUUID(), 
      isPinned:false,
      createdAt:new Date().toISOString(),
      viewCount:0,
      tags:[],
      isArchived:false,
      ...dateFormular, 
      
    };
    
    setBookmarks((listaVeche) => [bookmarkNou, ...listaVeche]);
  };
  const deleteBookmark=(iddesters:string)=>{
      setBookmarks((listaveche)=>listaveche.filter(b=>b.id!=iddesters))
  }
  const togglePin = (id: string) => {
  setBookmarks((listaVeche) =>
    listaVeche.map((b) =>
      b.id === id ? { ...b, isPinned: !b.isPinned } : b
    )
  );
}
const toggleArchive = (id: string) => {
  setBookmarks((prev) =>
    prev.map((b) => (b.id === id ? { ...b, isArchived: !b.isArchived } : b))
  );
};
const trackVisit = (id: string) => {
  setBookmarks((listaVeche) => {
    return listaVeche.map((b) => {
      return b.id === id 
        ? { ...b, viewCount: b.viewCount + 1, lastVisited: new Date().toISOString() } 
        : b;
    });
  });
};


  return (
    <BookmarkContext.Provider value={{ bookmarks, setBookmarks,addBookmark, archivedBookmarks,selectedTag,toggleArchive,setSelectedTag,searchTerm,setSearchTerm,filteredBookmarks,trackVisit,deleteBookmark,togglePin}}>
      {children}
    </BookmarkContext.Provider>
  );
} 

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  
  if (!context) {
    throw new Error("useBookmarks trebuie folosit în interiorul unui BookmarkProvider!");
  }
  
  return context;
};
