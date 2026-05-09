import React from 'react';
import { Button } from '../ui/Button';
import { Bookmark, Home, Plus, Archive, Settings } from 'lucide-react';

interface  HeaderProps{
    activeTab:PageType,
    setActiveTab:(tab:PageType)=>void
}
type PageType = 'home' | 'add' | 'archive' | 'settings';
export function Header({activeTab,setActiveTab}:HeaderProps){
    return(
<nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300 sticky top-0 z-50">

        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 cursor-pointer">
                <Bookmark size={24}  fill="currentColor"/>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                    Bookmark Manager
                </span>
            </div>
            

            <div className="flex items-center gap-2">
                <Button
                variant="ghost"
                isActive={activeTab=='home'}
                onClick={()=>setActiveTab("home")}>
                    <Home size={18}/>
                </Button>
                <Button 
                variant="ghost"
                isActive={activeTab=='add'}
                onClick={()=>setActiveTab("add")}>
                    <Plus size={18}/>
                </Button>
                <Button
                variant="ghost"
                isActive={activeTab=='archive'}
                onClick={()=>setActiveTab("archive")}>
                    <Archive size={18}/>

                </Button>
                <Button 
                variant="ghost"
                isActive={activeTab=='settings'}
                onClick={()=>setActiveTab("settings")}
                >
                    <Settings size={18}/>

                    </Button>

            </div>

        </div>

</nav>
    
);

    

}