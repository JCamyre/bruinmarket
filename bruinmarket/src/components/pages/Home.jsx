import React from "react";
import { AuthContext } from "../../App";
import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logout from "../../logout";
import SideBar from "../../components/SideBar";
import { useEffect } from "react";
import {getCategoryPosts, addUserBid, finalizeSale} from "../../utilities/Posts";
import Stars from "../Stars"
function Home() {
  const navigate = useNavigate();
  const userData = React.useContext(AuthContext);
  const [category, setCategory] = React.useState(null);
  const [currPosts, setCurrPosts] = React.useState([]);
  useEffect(() => {
    async function getPosts(category) {
      return await getCategoryPosts(category);
    }
    if (category) {
      getPosts(category).then((posts) => {
        setCurrPosts(posts);
      });
      // setCurrPosts(getPosts(category))
    }
  }, [category]);
  // console.log(userData.username)
  return (
    <>
      {/* <div>Logged in as {userData?.username}</div> */}
      {/* <Button
        onClick={() => {
          if (logout()) {
            navigate("/login");
          }
        }}
      >
        Logout
      </Button> */}
      <SideBar setCategory={setCategory} />
      {/* <Text>{JSON.stringify(currPosts)}</Text> */}
      <Button onClick={() => addUserBid("gCeJI9deiKHuGIBPO28I", "fuck2", 600)}>Test addUserBid</Button>
      <Button onClick={() => finalizeSale("gCeJI9deiKHuGIBPO28I", "test")}>Test finalizeSale</Button>
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
