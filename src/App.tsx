import { useState } from "react"
import { Header } from "./components/Header"
import { Home } from "./pages/Home" // Importă pagina de Home creată anterior

type PageType = 'home' | 'add' | 'archive' | 'settings';

function App() {
  // 1. Creăm starea care controlează întreaga aplicație
  const [activeTab, setActiveTab] = useState<PageType>('home');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-6">
        {/* Renderăm condiționat paginile */}
       {activeTab === 'home' &&<Home/>}
        
        {activeTab === 'add' && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <h2 className="text-2xl font-bold">Pagina Add Bookmark (În lucru...)</h2>
          </div>
        )}

        {activeTab === 'archive' && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <h2 className="text-2xl font-bold">Arhivă (În lucru...)</h2>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <h2 className="text-2xl font-bold">Setări (În lucru...)</h2>
          </div>
        )}
      </main>

    </div>
  )
}

export default App