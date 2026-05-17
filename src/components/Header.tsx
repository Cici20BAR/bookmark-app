import { NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Bookmark, Home, Plus, Archive, Settings } from 'lucide-react';

export function Header() {
    return (
        <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-4">
                
                <NavLink to="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 cursor-pointer">
                    <Bookmark size={24} fill="currentColor"/>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                        Bookmark Manager
                    </span>
                </NavLink>

                <div className="flex items-center gap-2">
                    <NavLink to="/">
                        {({ isActive }) => (
                            <Button variant="ghost" isActive={isActive}>
                                <Home size={18}/>
                            </Button>
                        )}
                    </NavLink>

                    <NavLink to="/add">
                        {({ isActive }) => (
                            <Button variant="ghost" isActive={isActive}>
                                <Plus size={18}/>
                            </Button>
                        )}
                    </NavLink>

                    <NavLink to="/archive">
                        {({ isActive }) => (
                            <Button variant="ghost" isActive={isActive}>
                                <Archive size={18}/>
                            </Button>
                        )}
                    </NavLink>

                    <NavLink to="/settings">
                        {({ isActive }) => (
                            <Button variant="ghost" isActive={isActive}>
                                <Settings size={18}/>
                            </Button>
                        )}
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
