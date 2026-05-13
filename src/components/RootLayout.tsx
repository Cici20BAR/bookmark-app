import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header /> 
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}