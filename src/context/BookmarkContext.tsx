import { useContext, createContext, useEffect, useState, type ReactNode, useMemo } from 'react';

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
  addBookmark: (dateFormular: BookmarkFormData) => void; 
  updateBookmark: (id: string, dateFormular: BookmarkFormData) => void;
  deleteBookmark:(date:any)=>void;
  deleteAllBookmarks: () => void;
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

type BookmarkFormData = Pick<Bookmark, 'title' | 'url' | 'description' | 'tags'>;
const BOOKMARKS_STORAGE_KEY = "bookmarks";

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const savedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);

    if (!savedBookmarks) return [];

    try {
      return JSON.parse(savedBookmarks) as Bookmark[];
    } catch {
      return [];
    }
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

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
    if (a.isPinned !== b.isPinned){
    return a.isPinned ? -1 : 1;
    }


    return b.viewCount-a.viewCount
  });

}, [bookmarks, searchTerm, selectedTag]);
  const addBookmark = (dateFormular: BookmarkFormData) => {
    const bookmarkNou = {
      id: crypto.randomUUID(), 
      isPinned:false,
      createdAt:new Date().toISOString(),
      viewCount:0,
      isArchived:false,
      ...dateFormular, 
      
    };
    
    setBookmarks((listaVeche) => [bookmarkNou, ...listaVeche]);
  };

  const updateBookmark = (id: string, dateFormular: BookmarkFormData) => {
    setBookmarks((listaVeche) =>
      listaVeche.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...dateFormular } : bookmark
      )
    );
  };
  const deleteBookmark=(iddesters:string)=>{
      setBookmarks((listaveche)=>listaveche.filter(b=>b.id!=iddesters))
  }
  const deleteAllBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem(BOOKMARKS_STORAGE_KEY);
  };
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
    <BookmarkContext.Provider value={{ bookmarks, setBookmarks,addBookmark, updateBookmark, archivedBookmarks,selectedTag,toggleArchive,setSelectedTag,searchTerm,setSearchTerm,filteredBookmarks,trackVisit,deleteBookmark,deleteAllBookmarks,togglePin}}>
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
