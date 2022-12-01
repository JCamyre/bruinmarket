import React, { useEffect, useState, useRef } from 'react'
// import { useRouter } from 'next/router'
import { useParams } from "react-router-app"
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { app, auth, database, authentication, firestore, initializeApp } from "../../firebase";
import {VStack, Heading, Image, Button, Input, Link } from '@chakra-ui/react'



// DYNAMIC POSTS PAGE

const PostPage = () => {
    const [postData, setPostData] = useState({})
    const [formInput, setFormInput] = useState({
        title: '',
        category: '',
        summary: '',
        price: 0,
        uid: '',
        
    })
    const {postId} = useParams()

    // const {
    //     query: { postId },
    // } = useParams()
    
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
    
    const { title, category, summary, price, uid} = postData
    const formRef = useRef()

    const handleChange = (e) =>
        setFormInput((prev) => {
            const key = e.target.name
            let value = e.target.value

            value = parseInt(value, 10) || value
            return { ...prev, [key]: value}
        })
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(formInput)
        formRef.current.reset()
    }

    return (
        <div>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
        </div>

        // <div>
        //     <Heading>title: {title}</Heading>
        //     <Heading>category: {category}</Heading>
        //     <Heading>summary: {summary}</Heading>
        //     <Heading>price: {price}</Heading>
        //     <Heading>uid: {uid}</Heading>

        //     <VStack
        //         ref={formRef}
        //         as='form'
        //         spacing={5}
        //         alginItems='start'
        //         w='30rem'
        //         onSubmit = {handleSubmit}
        //     >
        //         <Input
        //             value={formInput.name}
        //             name='name'
        //             placeholder='Name'
        //             onChange={handleChange}
        //             />
        //     </VStack>
        // </div>
    )
    
}

