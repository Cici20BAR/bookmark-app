import { useContext, createContext, useState, type ReactNode, useMemo } from 'react';

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
  filteredBookmarks: Bookmark[]; 
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedTag: string;
  setSelectedTag: (val: string) => void;



}

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");


  const filteredBookmarks=useMemo(()=>{
        const search=searchTerm.toLocaleLowerCase();

  return bookmarks.filter((b)=>{
    const isInTitle=b.title.toLocaleLowerCase().includes(search);
    const isInUrl=b.url.toLocaleLowerCase().includes(search);
    const isINDescription=b.description?.toLocaleLowerCase().includes(search)??false;

    const isInTags=b.tags.some(t=>t.toLocaleLowerCase().includes(search));
    const matchTag=selectedTag==='all'|| b.tags.includes(selectedTag);
    return (isInTitle||isInTags||isINDescription||isInUrl||isInTags)&&matchTag;
  })},[bookmarks,searchTerm,selectedTag]);

  const addBookmark = (dateFormular: any) => {
    const bookmarkNou = {
      id: crypto.randomUUID(), 
      ...dateFormular, 
    };
    
    setBookmarks((listaVeche) => [bookmarkNou, ...listaVeche]);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark ,selectedTag,setSelectedTag,searchTerm,setSearchTerm,filteredBookmarks}}>
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