import React from "react";
import { AuthContext } from "../../App";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useEffect } from "react";
import {
  getCategoryPosts,
  addUserBid,
  finalizeSale,
} from "../../utilities/Posts";

function Home() {
  const userData = React.useContext(AuthContext);
  const [category, setCategory] = React.useState(null);
  const [currPosts, setCurrPosts] = React.useState([]);
  useEffect(() => {
    async function getPosts(category) {
      return await getCategoryPosts(category);
    }
    getPosts(category).then((posts) => {
      setCurrPosts(posts);
    });
  }, [category]);
  // console.log(userData.username)
  console.log("Currposts: ", currPosts, category);

  return (
    <>
      <SideBar setCategory={setCategory} />
      <Button onClick={() => addUserBid("gCeJI9deiKHuGIBPO28I", "fuck2", 600)}>
        Test addUserBid
      </Button>
      <Button onClick={() => finalizeSale("gCeJI9deiKHuGIBPO28I", "test")}>
        Test finalizeSale
      </Button>
    </>
  );
}

export default Home;
