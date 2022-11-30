import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import {firestore, database } from "./../firebase"
import { doc, updateDoc, collection, query, where, getDocs} from "firebase/firestore"; 

function Stars({ uid }) {
  //const [stars, setStars] = useState(5);
  var stars = 5;
  //const [totalReviews, setTotalReviews] = useState(0);
  var totalReviews = 0;
  //const [userData, setData] = useState(null);
 // const [dataName, setDataName] = useState(null);
  uid = "vgdhaXomwwbt793g2MIjMgoHcZp1";

  async function updateStars(newRating) {
    //setTotalReviews(totalReviews + 1);
    const q = query(collection(database, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let docID = null;
    querySnapshot.forEach((doc) => {
      docID = doc.id;
      console.log(doc.id, " => ", doc.data());
      stars = doc.data().rating;
      totalReviews = doc.data().numReviews;
    });
    stars = (stars * totalReviews + newRating) / (totalReviews + 1);
    totalReviews = totalReviews + 1;
    //console.log(stars, totalReviews)
    const starDoc = doc(database, "users", docID);
    await updateDoc(starDoc, {
      "rating": stars,
      "numReviews": totalReviews
    });
  


    // Update User's total reviews and newRating with this uid
    
  }

  return (
    <div>
      <StarRatings
        rating={stars}
        changeRating={(stars) => updateStars(stars)}
        starHoverColor="yellow"
        starRatedColor="blue"
      />
    </div>
  );
}

export default Stars;
