import React, { useEffect, useState } from "react";
//import { Link, useNavigate } from "react-router-dom";
import './App.css';
import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Upload() {

    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const file = e.target[0]?.files[0]
      if (!file) return;
      const storageRef = ref(storage, `files/${file.name}`);
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
    }
  
    return (
      <div className="Upload">
        <form onSubmit={handleSubmit} className='form'>
          <input type='file' />
          <button type='submit'>Upload</button>
        </form>
        {
          !imgUrl &&
          <div className='outerbar'>
            <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
          </div>
        }
        {
          imgUrl &&
          <img src={imgUrl} alt='uploaded file' height={200} />
        }
      </div>
    );
  }
  export default Upload;
  