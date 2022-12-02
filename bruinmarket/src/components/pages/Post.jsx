import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./../../firebase";

import { Carousel } from "react-responsive-carousel";
import {
  Container,
  Box,
  Center,
  Img,
  Text,
  Button,
  VStack,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { AuthContext } from "../../App";
import "./Post.css";
import { firestore, database } from "../../firebase";
import Stars from "../Stars";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function Post() {
  const { postId } = useParams();
  const currentUser = React.useContext(AuthContext);

  const [post, setPost] = useState({
    uid: "",
    title: "",
    price: "",
    category: "",
    summary: "",
    bought_uid: "",
  });
  const [user, setUser] = useState(null);

  const [images, setImages] = useState([]);

  if (currentUser && !user) {
    setUser(currentUser);
  }

  console.log(`CurID is ${postId}`);
  useEffect(() => {
    let tempArr = [];
    const listRef = ref(storage, postId);
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          getDownloadURL(ref(storage, itemRef.fullPath))
            .then((url) => {
              // `url` is the download URL for 'images/stars.jpg'
              console.log(url);
              tempArr.push(url);
              // Or inserted into an <img> element

              // THIS IS JUST <img src={url} />
              // FDJSALFDJLSKAJFDLSALKFDSAKLFJDSLKAJFDLSAF
              // FDSAFDSAFDSAFDSAFDSAFDSAFSS
              // const img = document.getElementById("myimg");
              // img.setAttribute("src", url);
            })
            .catch((error) => {
              // Handle any errors
              console.log("didnt work");
            });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log("messed up");
      });
    console.log("Temp array: ", tempArr);

    setImages(tempArr);
  }, []);

  console.log(images);

  useEffect(() => {
    async function fetchPostInfo(postId) {
      console.log(postId);
      const q = query(
        collection(database, "posts"),
        where("post_id", "==", postId)
      );
      const querySnapshot = await getDocs(q);

      var postObject;
      querySnapshot.forEach((doc) => {
        postObject = doc.data();
      });
      return postObject;
    }
    console.log(postId);
    fetchPostInfo(postId).then((post) => {
      console.log("Post: ", post);
      setPost(post);
    });
  }, []);

  // if you are looking at a post that you bought

  return (
    <Container
      display="flex"
      maxW="container.xl"
      // bg="#eee"
      bg="purple.300"
      borderRadius="16"
      p="8"
      mt="4"
      mb="8"
      boxShadow="4px 16px 16px -4px rgb(0 0 0 / 25%);"
    >
      <Box w="60%">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showIndicators={false}
          showStatus={false}
          borderRadius={24}
        >
          <div>
            <img src="https://imgs.search.brave.com/iDWBRAOg5OxWbGv_P4lkcXBZQ6__WvX4XEljLG9FP_A/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zYmx5/LXdlYi1wcm9kLXNo/YXJlYWJseS5uZXRk/bmEtc3NsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/Ny8xNTIwNTMxOC9z/aWQtYmFsYWNoYW5k/cmFuLV85YS0zTk81/S0pFLXVuc3BsYXNo/LmpwZw" />
          </div>
          <div>
            <img src="https://imgs.search.brave.com/Dghzc_7RTRGKdeVmWN5zRL0tV24jSh8-1XXp9SvSveg/rs:fit:1200:900:1/g:ce/aHR0cHM6Ly9hc2tn/YW1lci5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDQv/QnJlZWQtUGFuZGFz/LmpwZw" />
          </div>
          <div>
            <img src="https://imgs.search.brave.com/Us-94VJX9bkGOxLCqzLhUYllfI9NMAs0IUj9dbpd_TM/rs:fit:1158:693:1/g:ce/aHR0cHM6Ly9zdGF0/aWMucGxhbmV0bWlu/ZWNyYWZ0LmNvbS9m/aWxlcy9yZXNvdXJj/ZV9tZWRpYS9zY3Jl/ZW5zaG90LzE5MjMv/My0xNTU5NzkwMzg2/X2xyZy5wbmc" />
          </div>
        </Carousel>
      </Box>
      <Spacer />
      <Box w="35%" pl="4" color="white">
        <Heading size="2xl" lineHeight={2}>
          {post.title}
        </Heading>
        <Text fontSize="2xl" lineHeight={2}>
          Price: ${post.price}
        </Text>
        <Heading size="lg">Category</Heading>
        <Text fontSize="2xl">{post.category}</Text>
        {/* <Text fontSize="sm">Listed a day ago in Sacramento, CA</Text> */}

        {/* <Heading size="lg">Details</Heading> */}
        {/* <Heading size="xs">Condition - New</Heading> */}
        <Heading size="lg">Description</Heading>
        <Text fontSize="2xl" lineHeight="8">
          {post.summary}
        </Text>
        {/* If we have to use a location thing, try this: https://www.openstreetmap.org/copyright */}
        <hr />
        <Heading size="lg">Seller Information</Heading>
        <VStack display="flex" justifyContent="left">
          <Text fontSize="xl">{user ? user.username : ""}</Text>
          <Text fontSize="xl">Contact me at: {user ? user.email : ""}</Text>
          <a href={`profile/${user ? user.uid : ""}`}>
            <Button color="purple.300">View Profile</Button>
          </a>
        </VStack>
        {/* https://openbase.com/js/react-star-ratings */}
        <Stars displayOnly={true} />

        {images.map((image) => (
          <div key={image}>
            <img src={image} />
            <p>test</p>
          </div>
        ))}
      </Box>
    </Container>
  );
}

export default Post;
