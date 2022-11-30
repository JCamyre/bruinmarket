import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import TempRegister from "./components/pages/TempRegister.jsx";
import CreatePost from "./components/pages/CreatePost.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/pages/Login.jsx";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/allposts" element={<AllPosts />} />
          <Route path="/testregister" element={<TempRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
