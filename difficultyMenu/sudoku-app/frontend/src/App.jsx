import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="*" element={<GamePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
