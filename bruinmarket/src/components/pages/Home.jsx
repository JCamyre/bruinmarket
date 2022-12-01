import React from "react";
import { AuthContext } from "../../App";
import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import logout from "../../logout";
import SideBar from "../../components/SideBar";
import { useEffect } from "react";
import {getCategoryPosts, addUserBid} from "../../utilities/Posts";
=======
import logout from "../../logout"
import Stars from "../Stars";
>>>>>>> stars

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
      <Button onClick={() => addUserBid("FKOqwCtZr5arG0Qt4Xz0WxKiJlS2", "test", 200)}/>
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
