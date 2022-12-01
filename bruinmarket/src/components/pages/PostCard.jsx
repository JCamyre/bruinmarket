import React from 'react'
// import Link from 'next/link'
// import NextLink from 'next/link'

import { VStack, Heading, Button, Link } from '@chakra-ui/react'
const PostCard = ({ title, category, summary, price, uid, id }) => {
	const handleDelete = async () => {}

	return (
    <>
		<VStack
			sx={{
				textTransform: 'capitalize',
				cursor: 'pointer',
				mt: '2rem',
				'& h2': {
					fontSize: '2rem',
				},
				alignItems: 'start',
			}}
		>
			<Link href={`/post/${id}`}>
				<Heading>title: {title}</Heading>
			</Link>

            <Heading>category: {category}</Heading>
            <Heading>summary: {summary}</Heading>
            <Heading>price: {price}</Heading>
            <Heading>uid: {uid}</Heading>


		</VStack>
    </>
	)
}

export default PostCard