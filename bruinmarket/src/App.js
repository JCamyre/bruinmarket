import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import Profile from "./components/pages/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/profile" element = {<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
