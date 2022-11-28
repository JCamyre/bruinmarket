import "./App.css";
import React, {useState, useRef, useCallback, useEffect, Fragment} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import { ChakraProvider } from "@chakra-ui/react";

import useFetch from "./hooks/useFetch";

// import axios from 'axios'


function App() {
  // const [images, setImages] = useState([]);
  // useEffect(() => {
  //   const apiRoot = "https://api.unsplash.com";
  //   // const accessKey = process.env.REACT_APP_ACCESSKEY;

  //   axios
  //     .get(`${apiRoot}/photos/random?client_id=h2EK8-VUWvB1kullrkmqRmW03DEGRVt61Avqesvuu1Y&count=10`)
  //     .then(res => setImages([...images, ...res.data]))
  //     // .then(res => console.log(res.data))
  // }, [])

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(query, page);
  const loader = useRef(null);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <>
      <div className="App">
        <input type="text" value={query} onChange={handleChange} />
        <div>
          {list.map((book, i) => (
            <div key={i}>{book}</div>
          ))}
        </div>
          {loading && <p>Loading...</p>}
          {error && <p>Error!</p>}
        <div ref={loader} />
      </div>

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
