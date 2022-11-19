import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import TempRegister from "./components/pages/TempRegister.jsx"
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/allposts" element={<AllPosts />} />
          <Route path="/testregister" element={<TempRegister />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
