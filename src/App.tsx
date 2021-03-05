import React from "react";
import CombatTracker from "./components/CombatTracker";

const App = () => (
  <div className="w-full h-screen flex flex-col bg-gray-50">
    <header className="w-full h-24 font-bold flex items-center px-12 bg-green-300">
      B/X Tools
    </header>
    <main className="w-full flex-auto p-12">
      <CombatTracker />
    </main>
  </div>
);
export default App;
