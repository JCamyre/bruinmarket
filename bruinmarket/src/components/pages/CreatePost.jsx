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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from './../../firebase';
import { AuthContext } from '../../App';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {database} from "./../../firebase";
import {collection, addDoc, getDocs} from "firebase/firestore"; 
import {getAuth, onAuthStateChanged} from "firebase/auth";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const format = (val) => `$` + val
  const parse = (val) => val.replace(/^\$/, '')

  const [price, setPrice] = React.useState('5.50')

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
    if(summary == "" || title == "" || category == ""){
      return;
    }
    const docRef = await addDoc(collection(database, "posts"), {
      uid: userData.uid,
      title: title,
      summary: summary,
      category: category,
      price: price
    });
    
    // database.post(user_id, title, summary, category)
    console.log(e.target)
    uploadPicture(e.target[4].files, docRef.id)

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
              <option>Cars</option>
              <option>Books</option>
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
            type="file"
            placeholder="filename"
            multiple
            accept="image/png, image/jpg, image/jpeg"
          />
          <Button type="submit" maxW="sm">
            Post!
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default CreatePost;
