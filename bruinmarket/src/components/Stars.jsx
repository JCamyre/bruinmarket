import React, { useState } from "react";
import StarRatings from "react-star-ratings";

function Stars() {
  const [stars, setStars] = useState(3.78);
  const [totalReviews, setTotalReviews] = useState(6);

  function updateStars(newRating) {
    //setTotalReviews(totalReviews + 1);
    setStars((stars * totalReviews + newRating) / (totalReviews + 1));
    setTotalReviews(totalReviews + 1);
    console.log(stars, totalReviews);
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
