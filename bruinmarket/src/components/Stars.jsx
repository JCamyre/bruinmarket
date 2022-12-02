import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { firestore, database } from "./../firebase";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getSlideTransition } from "@chakra-ui/react";
var totalReviews = 0;

function Stars({ uid, displayOnly }) {
  const [stars, setStars] = useState(null);
  //const [userData, setData] = useState(null);
  // const [dataName, setDataName] = useState(null);

  // KClYU5vyCx70iXs5MZe5, uid: gZZZwgXlt4NW7ZiZFJQQzKS74T23
  // uid = "gZZZwgXlt4NW7ZiZFJQQzKS74T23";

  React.useEffect(() => {
    async function getStars() {
      const q = query(collection(database, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      let docID = null;
      var stars;
      querySnapshot.forEach((doc) => {
        docID = doc.id;
        console.log(doc.id, " => ", doc.data());
        stars = doc.data().rating;
        totalReviews = doc.data().numReviews;
        if (isNaN(stars)) {
          stars = 0;
        }
        totalReviews = doc.data().numReviews;
        if (isNaN(totalReviews)) {
          totalReviews = 0;
        }
      });
      console.log(
        "Stars we are in getStars: ",
        stars,
        typeof stars,
        Number.isNaN(stars)
      );
      setStars(stars);
    }
    if (stars === null) {
      getStars().then(() => {
        console.log("we are updating stars: ", stars);
      });
    }
  });

  async function updateStars(newRating) {
    console.log("Function running");
    //setTotalReviews(totalReviews + 1);
    const q = query(collection(database, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let docID = null;
    var stars;
    querySnapshot.forEach((doc) => {
      docID = doc.id;
      console.log(doc.id, " => ", doc.data());
      stars = doc.data().rating;
      if (isNaN(stars)) {
        stars = 0;
      }
      totalReviews = doc.data().numReviews;
      if (isNaN(totalReviews)) {
        totalReviews = 0;
      }
    });
    console.log("# of stars in side function: ", stars, totalReviews);
    stars = (stars * totalReviews + newRating) / (totalReviews + 1);
    totalReviews = totalReviews + 1;

    const starDoc = doc(database, "users", docID);
    await updateDoc(starDoc, {
      rating: stars,
      numReviews: totalReviews,
    });
    setStars(stars);
    // Update User's total reviews and newRating with this uid
  }

  console.log("# of stars: ", stars, typeof stars, Number.isNaN(stars));

  return (
    <div>
      <StarRatings
        rating={stars ? stars : 0}
        changeRating={(stars) => updateStars(stars)}
        starHoverColor="yellow"
        starRatedColor="yellow"
      />
    </div>
  );
}

export default Stars;
