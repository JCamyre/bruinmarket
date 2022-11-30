import React, { useContext } from "react";
import {
  ChakraProvider,
  Center,
  Button,
  ButtonGroup,
  Heading,
  Image,
  Text,
  Container,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import profilepic from "../blank-profile-picture-gd2ddd1954_1280.png";
import { AuthContext } from "../../App";
import { useParams } from "react-router-dom";
import { database, firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function Profile() {
  const { uid } = useParams();
  // To get info for current user,

  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const query = await firestore.query(
        firestore.collection(database, "users"),
        firestore.where("uid", "==", uid)
      );
      const docs = await firestore.getDocs(query);
      let user = "";
      docs.forEach((doc) => {
        user = doc.data();
      });
      setUser(user);
    }
    getUser();
  }, [uid]);

  // const userData = useContext(AuthContext);
  console.log(user);
  const username = user ? user.username : "";
  // const username = userData ? userData.username : "User";

  return (
    <ChakraProvider>
      <Container maxW="container.md">
        <VStack
          spacing="24px"
          divider={<StackDivider borderColor="gray.200" />}
        >
          <VStack>
            <Center>
              <Image borderRadius="full" boxSize="150px" src={profilepic} />
            </Center>
            <Center>
              <Heading>
                {username}
                {"\n"}
              </Heading>
            </Center>
            <Center>
              <ButtonGroup>
                <Button>Follow</Button>
                <Button>View Profile</Button>
                <Button>Report</Button>
              </ButtonGroup>
            </Center>
          </VStack>
          <VStack>
            <Heading size="md">About</Heading>
            <Text size="sm">Joined BruinMarket in Year</Text>
          </VStack>
          <Heading size="md"> Market Listings - #</Heading>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default Profile;
