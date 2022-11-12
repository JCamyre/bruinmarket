import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import Post from "./components/pages/Post.jsx";
<<<<<<< HEAD
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/allposts" element={<AllPosts />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
=======

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
>>>>>>> Add basic route for posts with a URL parameter and a basic Post page
  );
}

export default App;
