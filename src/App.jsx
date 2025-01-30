import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import History from "./components/History.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
