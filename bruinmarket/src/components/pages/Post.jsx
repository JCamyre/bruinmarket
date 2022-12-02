import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { addUserBid, getBids, getPostData, getUserData, finalizeSale, getBuyer} from "../../utilities/Posts"
import {
  Container,
  Box,
  Center,
  Img,
  Text,
  Button,
  VStack,
  HStack,
  Heading,
  Link,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { AuthContext } from "../../App";
import "./Post.css";

function Post() {
  const { id } = useParams();

  const currentUser = React.useContext(AuthContext);

  async function Submit(e) {
    e.preventDefault();
    if (!isNaN(+bid) && bid !== "" && bid !== null) {
      setStatus("Successfully submitted/updated bid");
      const valueToSubmit = parseFloat(bid)
      await addUserBid(id, currentUser.uid, valueToSubmit)
    } else {
      setStatus("Invalid bid. Please re-enter");
    }
  }

  // get User based on the Post id
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [bid, setBid] = useState(null)
  const [bidStatus, setStatus] = useState("")
  const [currBids, setBids] = useState({})
  const [currBidsUsernames, setUsernames] = useState({})
  const [soldTo, setSold] = useState(null)

  useEffect(() => {
    const updatedPost = post;
    if (currentUser) {
      updatedPost["bought_uid"] = currentUser.uid;
      getUserData(currentUser.uid).then(e => setUser(e))
    }
    setPost(updatedPost);
  }, [currentUser]);

  useEffect(() => {
    getBids(id).then(e => {
      setBids(e)
    })
    getPostData(id).then(e => setPost(e))
    getBuyer(id).then(e => {
      if (id !== null) {
        setSold(e)
      }
    })
  }, [])
  
  useEffect(() => {
    if (currBids) {
      async function getUD() {
        let currentBids = {}
        for (var user in currBids) {
          await getUserData(user).then(ud => {currentBids[user] = ud.username; console.log(currentBids[user])})
        }
        console.log("test" + JSON.stringify(currentBids))
        return currentBids
      }
      getUD().then(ud => setUsernames(ud))
    }
  }, [currBids])
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
            <Img src="https://imgs.search.brave.com/iDWBRAOg5OxWbGv_P4lkcXBZQ6__WvX4XEljLG9FP_A/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zYmx5/LXdlYi1wcm9kLXNo/YXJlYWJseS5uZXRk/bmEtc3NsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/Ny8xNTIwNTMxOC9z/aWQtYmFsYWNoYW5k/cmFuLV85YS0zTk81/S0pFLXVuc3BsYXNo/LmpwZw" />
          </div>
          <div>
            <Img src="https://imgs.search.brave.com/Dghzc_7RTRGKdeVmWN5zRL0tV24jSh8-1XXp9SvSveg/rs:fit:1200:900:1/g:ce/aHR0cHM6Ly9hc2tn/YW1lci5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDQv/QnJlZWQtUGFuZGFz/LmpwZw" />
          </div>
          <div>
            <Img src="https://imgs.search.brave.com/Us-94VJX9bkGOxLCqzLhUYllfI9NMAs0IUj9dbpd_TM/rs:fit:1158:693:1/g:ce/aHR0cHM6Ly9zdGF0/aWMucGxhbmV0bWlu/ZWNyYWZ0LmNvbS9m/aWxlcy9yZXNvdXJj/ZV9tZWRpYS9zY3Jl/ZW5zaG90LzE5MjMv/My0xNTU5NzkwMzg2/X2xyZy5wbmc" />
          </div>
        </Carousel>
      </Box>
      <Spacer />
      <Box w="35%" pl="4" color="white">
        <Text fontSize="2xl">{post.title}</Text>
        <Text fontSize="lg">{post.price}</Text>
        <Text fontSize="sm">Listed a day ago in Sacramento, CA</Text>

        <Heading size="md">Details</Heading>
        <Heading size="xs">Condition - New</Heading>
        <Text fontSize="md">Description</Text>
        <Text fontSize="md">{post.summary}</Text>
        {/* If we have to use a location thing, try this: https://www.openstreetmap.org/copyright */}
        <hr />
        <Heading size="md">Seller Information</Heading>
        <VStack display="flex" justifyContent={"left"}>
        {currentUser.uid !== post.uid ?
          <>
          <Text fontSize="xl">{user.username}</Text>
          <Text fontSize="xl">Contact me at: {user.email}</Text>
          <a href={`profile/${user.uid}`}>
            <Button color="purple.300">View Profile</Button>
          </a></> : <Text> You are the seller </Text>}
          { (user !== {} && post !== {}) ? (user?.uid !== post?.uid) ? //if not user who submitted post, give option to submit bid
          (!soldTo ?
          <form onSubmit={Submit} method="POST">
            <VStack spacing="2">
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                  children='$'
                />
                <Input 
                  placeholder="Enter a bid"
                  onChange={e => setBid(e.currentTarget.value)}
                />
              </InputGroup>
              
              <Button type="submit" maxW="sm" >
                Submit bid
              </Button>
              <Text color="red"> {bidStatus} </Text>
            </VStack>
          </form> : <Text>{`Already sold to ${currBidsUsernames[soldTo]}`}</Text>)
          : //if user is seller
            <TableContainer>
              <Table>
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Bid price</Th>
                  <Th>         </Th>
                </Tr>
              </Thead>
              <Tbody>
              {(!currBids && !currBidsUsernames) ? Object.keys(currBids).map(user => {
                return (
                  <Tr>
                      <Td>{`${currBidsUsernames[user]}`}</Td> 
                      <Td>{`$${currBids[user].toFixed(2).toString()}`}</Td>
                      <Td>
                        {soldTo !== null ? (soldTo === user ?
                          "Sold \u2713"
                          : "") :
                          <Button color="purple.300" onClick={() => {
                            setSold(user)
                            console.log(soldTo)
                            finalizeSale(id, user)}}>Accept bid</Button>
                        }
                      </Td>
                  </Tr>
                )
              }) : <Tr><Td>No bids yet</Td></Tr>}
              </Tbody>
              </Table>
            </TableContainer>
          : null
          }
        </VStack>
        {/* https://openbase.com/js/react-star-ratings */}
        <Text>{post.bought_uid}</Text>
        {post.bought_uid && currentUser.uid && (
          <Text fontSize="lg">&#9733;&#9733;&#9733;&#9733;&#9733;</Text>
        )}
      </Box>
    </Container>
  );
}

export default Post;
