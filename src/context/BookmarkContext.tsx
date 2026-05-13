import { useContext, createContext, useState, type ReactNode } from 'react';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  tags: string[]; 
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (dateFormular: any) => void; 
}

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const addBookmark = (dateFormular: any) => {
    const bookmarkNou = {
      id: crypto.randomUUID(), 
      ...dateFormular, 
    };
    
    setBookmarks((listaVeche) => [bookmarkNou, ...listaVeche]);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark }}>
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
