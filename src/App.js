import React from "react";
import "./styles/App.css";
import Home from "./components/Home/Home";
import Nav from "./components/Navbar/Nav";
import { Routes, Route } from "react-router-dom"
import Search from "./components/SearchPage/Search";
import Audiobook from "./components/Audiobook/Audiobook";
import Recommendation from "./components/Recommendation/Recommendation"



function Main() {
  return (
    <div >
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="audiobook" element={<Audiobook />} />
        <Route path="search" element={<Search />} />
        <Route path="recommendations" element={<Recommendation />} />
      </Routes>
    </div>
  )
}


function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
