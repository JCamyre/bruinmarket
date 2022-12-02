import React, { useEffect, useState, useRef } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { app, auth, database, authentication, firestore, initializeApp } from "../../firebase";
import {VStack, Heading, Image, Button, Input, Link } from '@chakra-ui/react'
import PostCard from './PostCard';


const PostId = ({match: {params: {postId}}}) => {
    const [postData, setPostData] = useState({})
    const [formInput, setFormInput] = useState({
        title: '',
        category: '',
        summary: '',
        price: 0,
        uid: '',
        
    })

    const { id, title, category, summary, price, uid} = postData
	let { userId } = useParams();
	console.log(userId);
	
    useEffect(() => {
        ;(async() => {
            if (!postId) return false
            const docRef = doc(database, 'posts', postId)

            
            const docSnap = await getDoc(docRef)
            
            // Check if document exists
            if (docSnap.exists()) {
                const data = docSnap.data()
                setPostData(data)
            }
            else {
                console.log('no post')
            }
            
        })()
    } , [postId])
}
    
    
//     const formRef = useRef()

//     const handleChange = (e) =>
//         setFormInput((prev) => {
//             const key = e.target.name
//             let value = e.target.value

//             value = parseInt(value, 10) || value
//             return { ...prev, [key]: value}
//         })
    
//     const handleSubmit = async(e) => {
//         e.preventDefault()
//         console.log(formInput)
//         formRef.current.reset()
//     }

//     return (
//         <div>
//             <h1>Heading 1</h1>
//             <h2>Heading 2</h2>
//         </div>
//     )
// }
// export default PostId;

// const PostCard = ({ title, category, summary, price, uid, id }) => {


// function PostId() {
// 	// Get the userId param from the URL.
// 	let { userId } = useParams();
// 	console.log(userId);
// 	return (
// 		<>
// 			<div>{userId}</div>
// 			{database.collection('posts').doc('24wn1y7et4MRWrKhp42L').get()}
// 			await setDoc(doc(db, "posts", "new-city-id"), data);
// 		</>
// 	)
//   }

export default PostId;



// const PostId = ({ title, category, summary, price, uid, id }) => {
// 	const handleDelete = async () => {}
// 	const [postData, setPostData] = useState({})
//     const [formInput, setFormInput] = useState({
//         title: '',
//         category: '',
//         summary: '',
//         price: 0,
//         uid: '',
// 	})

// 	return (
//     <>
// 		<VStack>

            // <Heading>category: {category}</Heading>
            // <Heading>summary: {summary}</Heading>
            // <Heading>price: {price}</Heading>
            // <Heading>uid: {uid}</Heading>


// 		</VStack>
//     </>
// 	)
// }

// export default PostId