import "./App.css";
import React, {useState, useRef, useCallback, useEffect, Fragment, Component} from "react";
import useFetch from "./hooks/useFetch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import axios from 'axios'

import { app, auth, database, authentication, firestore, initializeApp } from './firebase'
import { collection, getDocs } from "firebase/firestore";
import FetchPosts from "./components/pages/FetchPosts";
// import firebase from "./firebase"
// import db from "firebase/database"
// import '@firebase/auth'


function App() {
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(query, page);
  const loader = useRef(null);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // // FIREBASE - FETCH POSTS BY ID & DATA
  // const [posts, setPosts] = useState([])
  // useEffect(() => {
  //   ;(async () => {
  //       const colref = collection(database, 'posts')
  //       const snapshots = await getDocs(colref)

  //       const docs = snapshots.docs.map((doc) => {
  //         const data = doc.data()
  //         data.id = doc.id
  //         return data
  //       })
  //       setPosts(docs)
  //       console.log(docs);
  //   })()
  // }, []);



         // OLD
  // function getPostsFromFirebase() {
  //   ref.onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setPosts(items);
  //   });
  // }
  // useEffect(() => {
  //   getPostsFromFirebase();
  // }, []);

  // HANDLE INFINITE SCROLLING
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
      <div className="FirebasePosts">
        {posts.map((post) => (
          <div key={post.id}>
            <picture>{post.image}</picture>
            <p>{post.title}</p>
          </div>
        ))}
      </div>


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
            <Route path="/fetchposts" element={<FetchPosts />} />

          </Routes>
        </BrowserRouter>
      </ChakraProvider>

    </>
  );
}

export default App;