import React from "react";
import { AuthContext } from '../../App'
import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import logout from "../../logout"
import Stars from "../Stars";

function Home() {
  const navigate = useNavigate();
  const userData = React.useContext(AuthContext)
  // console.log(userData.username)
  return (
    <>
      <div>Home</div>
      <div>Logged in as {userData?.username}</div>
      <Button onClick={() => {
        if (logout()) {
          navigate("/login")
        }
      }}>Logout</Button>
      <Stars /> 
    </>
  );
}

export default Home;
