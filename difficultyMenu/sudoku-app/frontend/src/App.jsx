import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register"
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
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
