import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/allposts" element={<AllPosts />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
