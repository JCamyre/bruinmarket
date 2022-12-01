import React, {useState, useRef, useCallback, useEffect, Fragment, Component} from "react";
import {Input, Button, Text, Box} from "@chakra-ui/react"
import { app, auth, database, authentication, firestore, initializeApp } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import PostCard from './PostCard'
import { useRouter } from 'next/router'


// FIREBASE - FETCH POSTS BY ID & DATA
const FetchPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    ;(async () => {
        const colref = collection(database, 'posts')
        const snapshots = await getDocs(colref)

        const docs = snapshots.docs.map((doc) => {
          const data = doc.data()
          data.id = doc.id
          return data
        })
        setPosts(docs)
        console.log(docs);
    })()
  }, []);

//   return (
//     <>
//         <div className="FirebasePosts">
//             {posts.map((post) => (
//             <div key={post.id}>
//                 <picture>{post.image}</picture>
//                 <p>{post.title}</p>
//             </div>
//             ))}
//         </div>


//         <header>
//             <h1>fetch posts</h1>
//         </header>
//     </>
//     )

    return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gridGap: '1rem',
			}}
		>
			{posts.map((post) => (
				<PostCard key={post.id} {...post} />
			))}
		</Box>
	)
}

export default FetchPosts