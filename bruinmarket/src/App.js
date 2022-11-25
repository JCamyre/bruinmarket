import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import AllPosts from "./components/pages/AllPosts.jsx";
import TempRegister from "./components/pages/TempRegister.jsx"
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/pages/Login.jsx";
import ProtectedRoute from "./utilities/ProtectedRoute"
import { auth } from "./firebase"

function App() {
  const [loggedIn, setLoggedIn] = React.useState(-1); //initialize to -1 to account for period of time when login state is indeterminate
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
      console.log('set true')
      setLoggedIn(1);
    } else {
      console.log('set false')
      setLoggedIn(0);
    }
  });
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          {loggedIn === -1 ? null :
            <>
              <Route element={<ProtectedRoute allowed={loggedIn===1} alternateRoute="/login" />} >
                <Route index element={<Home />} />
                <Route path="/allposts" element={<AllPosts />} />
              </Route>              
              <Route element={<ProtectedRoute allowed={loggedIn===0} alternateRoute="/" />} >
                <Route path="/testregister" element={<TempRegister />} />
                <Route path="/login" element={<Login />} />
              </Route>
            </>    
          }          
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
