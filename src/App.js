import React, { useState } from "react";
import "./styles/App.css";
import Home from "./components/Home/Home";
import Nav from "./components/Navbar/Nav";
import { Routes, Route } from "react-router-dom"
import Search from "./components/SearchPage/Search";
import Audiobook from "./components/Audiobook/Audiobook";
import Recommendation from "./components/Recommendation/Recommendation"
import { MediaControlProvider, useMediaControlContext } from "./context/Context";
import MediaPlayer from "./components/Audiobook/MediaPlayer";



function Main() {
  const mediaContext = useMediaControlContext();
  return (
    <div >
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="audiobook" element={<Audiobook />} />
        <Route path="search" element={<Search />} />
        <Route path="recommendations" element={<Recommendation />} />
      </Routes>
      {mediaContext.mediaControl.isActive && < MediaPlayer />}
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <MediaControlProvider>
        <Main />
      </MediaControlProvider>
    </div>
  )
}

export default App;
