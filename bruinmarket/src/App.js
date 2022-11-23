import "./App.css";
import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import { ChakraProvider } from "@chakra-ui/react";

// fetch images from unsplash API. random image generator
import axios from 'axios'


function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const apiRoot = "https://api.unsplash.com";
    // const accessKey = process.env.REACT_APP_ACCESSKEY;

    axios
      .get(`${apiRoot}/photos/random?client_id=h2EK8-VUWvB1kullrkmqRmW03DEGRVt61Avqesvuu1Y&count=10`)
      .then(res => setImages([...images, ...res.data]))
      // .then(res => console.log(res.data))
  }, [])

  return (
    <>
      {images.map(image => (
        <AllPosts url={image.urls.thumb} key={image.id} />
      ))}

      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/allposts" element={<AllPosts />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
