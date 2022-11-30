import React from "react";
import { AuthContext } from "../../App";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logout from "../../logout";

function Home() {
  const navigate = useNavigate();
  // console.log(userData.username)
  return (
    <>
      <div>Home</div>
      <Button
        onClick={() => {
          if (logout()) {
            navigate("/login");
          }
        }}
      >
        Logout
      </Button>
    </>
  );
}

export default Home;
