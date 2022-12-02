import React, { useState, useEffect } from "react";
import { Icon } from "leaflet";
import marker from "../marker.png";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
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
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
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
import {
  addUserBid,
  getBids,
  getPostData,
  getUserData,
  finalizeSale,
  getBuyer,
} from "../../utilities/Posts";

const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [22, 32],
});

function ChangePosition({ latitude, longitude }) {
  const map = useMap();
  map.flyTo([latitude, longitude]);
  return null;
}

function Post() {
  const { postId } = useParams();
  const currentUser = React.useContext(AuthContext);
  const [latitude, setLatitude] = useState(34.0725);
  const [longitude, setLongitude] = useState(-118.4522);

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);

  const [images, setImages] = useState([]);

  const [bid, setBid] = useState(null);
  const [bidStatus, setStatus] = useState("");
  const [currBids, setBids] = useState({});
  const [currBidsUsernames, setUsernames] = useState({});
  const [soldTo, setSold] = useState(null);

  if (currentUser && !user) {
    setUser(currentUser);
  }

  async function Submit(e) {
    e.preventDefault();
    if (!isNaN(+bid) && bid !== "" && bid !== null) {
      setStatus("Successfully submitted/updated bid");
      const valueToSubmit = parseFloat(bid);
      await addUserBid(postId, currentUser.uid, valueToSubmit);
    } else {
      setStatus("Invalid bid. Please re-enter");
    }
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

  useEffect(() => {
    const updatedPost = post;
    if (currentUser) {
      updatedPost["bought_uid"] = currentUser.uid;
      getUserData(currentUser.uid).then((e) => setUser(e));
    }
    setPost(updatedPost);
  }, [currentUser]);

  useEffect(() => {
    if (currBids) {
      async function getUD() {
        let currentBids = {};
        for (var user in currBids) {
          await getUserData(user).then((ud) => {
            currentBids[user] = ud.username;
            console.log(currentBids[user]);
          });
        }
        console.log("test" + JSON.stringify(currentBids));
        return currentBids;
      }
      getUD().then((ud) => setUsernames(ud));
    }
  }, [currBids]);
  // if you are looking at a post that you bought

  useEffect(() => {
    getBids(postId).then((e) => {
      setBids(e);
    });
    getPostData(postId).then((e) => setPost(e));
    getBuyer(postId).then((e) => {
      if (postId !== null) {
        setSold(e);
      }
    });
  }, []);

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
      setLatitude(post["latlongcoord"][0]);
      setLongitude(post["latlongcoord"][1]);
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
      mt="8"
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
                <Img src={image} maxH="100%" maxW="600px" />
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
          <Stars displayOnly={true} uid={post ? post.uid : ""} />
          <Text fontSize="xl">{seller ? seller.username : ""}</Text>
          <Text fontSize="xl">Contact me at: {seller ? seller.email : ""}</Text>
          <a href={`/profile/${seller ? seller.uid : ""}`}>
            <Button color="purple.300">View Profile</Button>
          </a>
          {(user ? user.uid : "") !== (post ? post.uid : "") ? ( //if not user who submitted post, give option to submit bid
            !soldTo ? (
              <form onSubmit={Submit} method="POST">
                <VStack spacing="2">
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children="$"
                    />
                    <Input
                      placeholder="Enter a bid"
                      onChange={(e) => setBid(e.currentTarget.value)}
                    />
                  </InputGroup>

                  <Button type="submit" maxW="sm" color="purple.300">
                    Submit bid
                  </Button>
                  <Text
                    color={
                      bidStatus === "Successfully submitted/updated bid"
                        ? "green"
                        : "red"
                    }
                  >
                    {" "}
                    {bidStatus}{" "}
                  </Text>
                </VStack>
              </form>
            ) : soldTo === currentUser.uid ? (
              <Text color="red">{`Already sold to ${currBidsUsernames[soldTo]}`}</Text>
            ) : (
              <Text color="green">You already own this item</Text>
            )
          ) : (
            <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Bid price</Th>
                  <Th> </Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(currBids).length !== 0 ||
                Object.keys(currBidsUsernames).length !== 0 ? (
                  Object.keys(currBids).map((user) => {
                    return (
                      <Tr>
                        <Td>{`${currBidsUsernames[user]}`}</Td>
                        <Td>{`$${currBids[user].toFixed(2).toString()}`}</Td>
                        <Td>
                          {soldTo !== null ? (
                            soldTo === user ? (
                              "Sold \u2713"
                            ) : (
                              ""
                            )
                          ) : (
                            <Button
                              color="purple.300"
                              onClick={() => {
                                setSold(user);
                                console.log(soldTo);
                                finalizeSale(postId, user);
                              }}
                            >
                              Accept bid
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td>No bids yet</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
          )}
          
        </VStack>
        {/* https://openbase.com/js/react-star-ratings */}

        <VStack>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin=""
          />
          <MapContainer
            center={[latitude, longitude]}
            zoom={16}
            scrollWheelZoom={false}
          >
            {<ChangePosition latitude={latitude} longitude={longitude} />}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={myIcon} />
          </MapContainer>
        </VStack>
      </Box>
    </Container>
  );
}

export default Post;
