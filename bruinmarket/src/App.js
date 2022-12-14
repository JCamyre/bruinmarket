import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import Post from "./components/pages/Post.jsx";
import Register from "./components/pages/Register.jsx";
import Profile from "./components/pages/Profile";
import CreatePost from "./components/pages/CreatePost.jsx";
import Map from "./components/pages/Map.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login.jsx";
import ProtectedRoute from "./utilities/ProtectedRoute";
import { auth, firestore, database } from "./firebase";
import { getUserData } from "./utilities/Posts";

const AuthContext = React.createContext(null);

function App() {
  const [loggedIn, setLoggedIn] = React.useState(-1); //initialize to -1 to account for period of time when login state is indeterminate
  const [userUID, setUserUID] = React.useState(null);
  const [userData, setData] = React.useState(null);
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(1);
        setUserUID(user.uid);
        // console.log(userData.username)
      } else {
        console.log("successfully logged out");
        setLoggedIn(0);
        setUserUID(null);
        // console.log(userData.username)
      }
    });
  }, []); //useEffect prevents onAuthStateChanged listener from being set multiple times
  React.useEffect(() => {
    async function getUserData(uid) {
      const q = firestore.query(
        firestore.collection(database, "users"),
        firestore.where("uid", "==", uid)
      );
      const docs = await firestore.getDocs(q);
      let data = null;
      docs.forEach((doc) => {
        // console.log(doc.data().username)
        data = doc.data();
      });
      console.log(data);
      return data;
    }
    // Can set context here
    if (userUID) {
      getUserData(userUID).then((data) => setData(data));
    } else {
      setData(null);
    }
  }, [userUID]);
  return (
    <ChakraProvider>
      <AuthContext.Provider value={userData}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            {loggedIn === -1 ? null : (
              <>
                <Route
                  element={
                    <ProtectedRoute
                      allowed={loggedIn === 1}
                      alternateRoute="/login"
                    />
                  }
                >
                  <Route path="/" element={<Home />} />
                  <Route path="/allposts" element={<AllPosts />} />
                  <Route path="/profile/:uid" element={<Profile />} />
                  <Route path="/post/:postId" element={<Post />} />
                  <Route path="/createpost" element={<CreatePost />} />
                </Route>
                <Route
                  element={
                    <ProtectedRoute
                      allowed={loggedIn === 0}
                      alternateRoute="/"
                    />
                  }
                >
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Route>
              </>
            )}
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export { AuthContext };
export default App;
