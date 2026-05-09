import { Button } from "./ui/Button"
function App() {
  return (
    // bg-slate-950 = fundalul închis din pozele tale
    // flex, items-center, justify-center = pune textul fix în mijloc
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        
      
            <Button  variant= {"primary"}isActive={false} isAdd={false} >Apasa</Button>

      
    </div>
  )
}

export default App