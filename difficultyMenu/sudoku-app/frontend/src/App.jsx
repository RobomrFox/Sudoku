import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="*" element={<GamePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
