import { createContext, useContext, useEffect, useState,type  ReactNode } from 'react';
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
const ThemeContext=createContext<ThemeContextType|null>(null);

export function ThemeProvider({children}:{children:ReactNode}){
    const [theme,setTheme]=useState<Theme>(()=>{
        return(localStorage.getItem('theme') as Theme)||'light';

    })

    useEffect(()=>{
        const root=window.document.documentElement;
        if(theme==='dark'){
            root.classList.add('dark');

        }else{
            root.classList.remove("dark");
        }
        localStorage.setItem('theme',theme);

    },[theme])
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
      {children} 
    </ThemeContext.Provider>
    )
    
}
export const  useTheme=()=>{
const context=useContext(ThemeContext);
if(!context){
throw new Error("useBookmarks trebuie folosit în interiorul unui BookmarkProvider!");


}
return context;
}
