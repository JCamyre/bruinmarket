import {
  Container,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Button,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from './../../firebase';
import { AuthContext } from '../../App';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {database} from "./../../firebase";
import {collection, addDoc, doc, updateDoc, getDocs} from "firebase/firestore"; 

import {getAuth, onAuthStateChanged} from "firebase/auth";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [status, setStatus] = useState(3);
  const format = (val) => `$` + val
  const parse = (val) => val.replace(/^\$/, '')

  const getStatusMessage = (status) => {
    switch (status) {
      case 0:
        return `Invalid Input: One or more empty fields`;
      case 1:
        return 'Invalid Zip Code';
      case 2:
        return 'Invalid Price';
      default:
        return ``;
    }
  };

  var ziptolonglat = {
    "90024": [34.065723, -118.434969],
    "90025": [34.045421, -118.445873],
    "90049": [34.092540, -118.491064],
    "90095": [34.071200, -118.443523],
    "90210": [34.100517, -118.414712],
    "90077": [34.108023, -118.456964],
    "90067": [34.057597, -118.413998]
  };

  const [price, setPrice] = React.useState("");

  const navigate = useNavigate();
  const userData = React.useContext(AuthContext);
  async function Submit(e) {
    e.preventDefault();
    console.log();
    // need to redirect to / page
    console.log(`Title: ${title}, Summary: ${summary}, Category: ${category}`);

    // Maybe we'll add a check to check for duplicate posts, but for now, just push to the Post table
    // WE NEED TO ADD A DATABASE CALL THAT RETURNS THE ID OF THE CURRENT USER LOGGED IN
    if(userData == null){
      console.log("UserData is null u messed up")
    }
    if(summary === "" || title === "" || category === "" || zipcode === "" || price === ""){
      setStatus(0);
      return;
    }
    if (!(zipcode in ziptolonglat)) {
      setStatus(1);
      return;
    }
    if (!(!isNaN(+price) && price !== "" && price !== null && (+price) >= 0)) {
      setStatus(2);
      return;
    }
    if (price < 0) {
      setStatus(2)
      return;
    }
    setStatus(3);
    const docRef = await addDoc(collection(database, "posts"), {
      uid: userData.uid,
      title: title,
      summary: summary,
      category: category,
      price: price,
      bought_uid: null,
      latlongcoord: ziptolonglat[zipcode]
    });



    // database.post(user_id, title, summary, category)
    console.log(e.target)
    const curDoc = doc(database, "posts", docRef.id);
    await updateDoc(curDoc, {
      "post_id": docRef.id,
    });
    uploadPicture(e.target[5].files, docRef.id)

    // pictures we will figure out.

    // If everything goes well, just redirect
    if (true) {
      return navigate("/");
    } else {
      console.log("You fricked up");
    }
  }

  // img should be a file
  function uploadPicture(imgs, post_id) {
    const imgsArr = [...imgs];

    imgsArr.forEach((img, i) => {
      // FOR EACH IMAGE, UPLOAD THE FILE TO FIREBASE, WITH THE OUR WACKY NAMING SYSTEM
      // POSTID + _ + PICTURE NUMBER (use the i variable for PICTURE NUMBER)
      const file = img;
      if (!file) return;
      const storageRef = ref(storage, `${post_id}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL)
          });
        }
      );
  
      console.log(img, i);
    });
  }

  const categories = [
    "All",
    "Books",
    "Cars",
    "Clothes",
    "Electronics",
    "Housing",
    "Music",
    "Sporting",
    "Toys",
    "Miscellaneous",
  ]; 

  return (
    <Container maxW="container.md" pt={40}>
      <form onSubmit={Submit} method="POST">
        <Stack spacing="8">
          <Input
            placeholder="Enter title"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <Textarea
            value={summary}
            placeholder="Enter summary"
            onChange={(e) => setSummary(e.currentTarget.value)}
          />
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select category"
              onChange={(e) => setCategory(e.currentTarget.value)}
            >
              {categories.map(category => (
                <option>{category}</option>
              ))}
            </Select>
          </FormControl>
          
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='1.2em'
              children='$'
            />
            <Input 
              placeholder="Enter price"
              onChange={(e) => setPrice(e.currentTarget.value)}
            />
          </InputGroup>
          <Input
            placeholder="Postal Code"
            onChange={(e) => setZipcode(e.currentTarget.value)}
          />
      
          <Input
            type="file"
            placeholder="filename"
            multiple
            accept="image/png, image/jpg, image/jpeg"
          />
          <Button type="submit" maxW="sm">
            Post!
          </Button>
          <Text color="red"> {getStatusMessage(status)} </Text>
        </Stack>
      </form>
    </Container>
  );
}

export default CreatePost;
