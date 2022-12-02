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

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);

  const [images, setImages] = useState([]);

  if (currentUser && !user) {
    setUser(currentUser);
  }

  async function findSeller(uid) {
    console.log("Function running");
    //setTotalReviews(totalReviews + 1);
    const q = query(collection(database, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let seller;
    console.log("QUERY SNAPSHOT: ", querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log("FUCK ME ", doc.data());
      seller = doc.data();
    });
    console.log("funny funny", seller);
    setSeller(seller);
  }

  if (post && seller === null) {
    console.log("POST UID: ", post.uid, post);
    findSeller(post.uid);
  }

  console.log("SELLLERRERE", seller);

  console.log(`CurID is ${postId}`);
  useEffect(() => {
    const listRef = ref(storage, postId);

    async function getImages(listRef) {
      listAll(listRef).then((res) => {
        let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises).then((urls) => {
          setImages(urls);
        });
      });
    }
    getImages(listRef).then(async (res) => {
      console.log("fdafdsafdsafds");
      const results = await Promise.all(res);
      console.log(
        "RESULFDJKSLA;FDSLAFDJSALFDSSADUCMCUCM CUCMCUC CUCCUM",
        results
      );
    });

    // getImages(listRef).then((images) => {
    //   console.log("ImGEAEAFEAFEAFSD: ", images);
    //   setImages(images);
    // });
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
      maxH="100%"
      // bg="#eee"
      bg="purple.300"
      borderRadius="16"
      p="8"
      mt="4"
      mb="8"
      boxShadow="4px 16px 16px -4px rgb(0 0 0 / 25%);"
    >
      <Box w="60%" minH="100vh">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showIndicators={false}
          showStatus={false}
          borderRadius={24}
        >
          {images &&
            images.map((image) => (
              <div key={image}>
                <Img src={image} maxH="500px" maxW="300px" />
              </div>
            ))}
        </Carousel>
      </Box>
      <Spacer />
      <Box w="35%" pl="4" color="white">
        {/* BUYER POV */}
        {post && post.bought_uid === null ? (
          <Heading size="2xl" lineHeight={1}>
            {post ? post.title : ""}
          </Heading>
        ) : (
          <Heading size="2xl" lineHeight={1} color="red">
            {post ? post.title + " - SOLD!" : ""}
          </Heading>
        )}
        {post && user && post.bought_uid === user.uid && (
          <Box>
            <Heading size="2xl" lineHeight={1} color="orange.400">
              YOU HAVE BOUGHT THIS ITEM! Please rate your seller!
            </Heading>
            <Stars uid={post ? post.uid : ""} />
          </Box>
        )}
        {/* SELLER POV */}
        {post && user && post.uid === user.uid && post.bought_uid && (
          <Box>
            <Heading size="2xl" lineHeight={1} color="orange.400">
              Rate your buyer!
            </Heading>
            <Stars uid={post ? post.bought_uid : ""} />
          </Box>
        )}

        <Text fontSize="2xl" lineHeight={2}>
          Price: ${post ? post.price : ""}
        </Text>
        <Heading size="lg">Category</Heading>
        <Text fontSize="2xl">{post ? post.category : ""}</Text>

        <Heading size="lg">Description</Heading>
        <Text fontSize="2xl" lineHeight="8">
          {post ? post.summary : ""}
        </Text>

        <hr />
        <Heading size="lg">Seller Information</Heading>
        <VStack display="flex" justifyContent="left">
          <Text fontSize="xl">{seller ? seller.username : ""}</Text>
          <Text fontSize="xl">Contact me at: {seller ? seller.email : ""}</Text>
          <a href={`/profile/${seller ? seller.uid : ""}`}>
            <Button color="purple.300">View Profile</Button>
          </a>
        </VStack>
        {/* https://openbase.com/js/react-star-ratings */}
        <Stars displayOnly={true} uid={post ? post.uid : ""} />
      </Box>
    </Container>
  );
}

export default Post;
