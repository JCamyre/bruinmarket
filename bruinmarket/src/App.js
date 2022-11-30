import "./App.css";
import React, {useState, useRef, useCallback, useEffect, Fragment, Component} from "react";
import useFetch from "./hooks/useFetch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import axios from 'axios'
// import FetchImages from "./components/pages/FetchImages";

import firebase from './firebase'
import '@firebase/auth'


// ARRAY OF ITEMS - TEST
let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];
let itemList=items.map((item,index)=>{
  return <li key={index}>{item}</li>
})

// function Image(props) {
//   return (
//     <picture>
//       <source media="(min-width:465px)" src='https://img2.carmax.com/assets/22970819/hero.jpg?width=400'></source>
//       <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;"></img>
//         {props.value}
//   </picture>
//   );
// }



function App() {
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(query, page);
  const loader = useRef(null);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // FIREBASE - FETCH POSTS
  const ref = firebase.firestore().collection("posts");
  console.log(ref);

  function getPostsFromFirebase() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPosts(items);
    });
  }

  useEffect(() => {
    getPostsFromFirebase();
  }, []);

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
          </Routes>
        </BrowserRouter>
      </ChakraProvider>

      <div>
        <h2>This is a simple list of items</h2>
        <ul>
          {itemList}
        </ul>
      </div>
    </>
  );
}

export default App;