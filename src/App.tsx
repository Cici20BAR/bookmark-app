function App() {
  return (
    // bg-slate-950 = fundalul închis din pozele tale
    // flex, items-center, justify-center = pune textul fix în mijloc
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-2xl scale-110">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          Tailwind e activ! 🚀
        </h1>
        <p className="mt-2 text-blue-100 font-medium">
          Dacă vezi acest card albastru pe fundal negru, poți începe designul.
        </p>
      </div>
    </div>
  )
}

export default App