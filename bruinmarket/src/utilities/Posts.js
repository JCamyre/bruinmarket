import { firestore, database } from "../firebase"

const getCategoryPosts = async (category) => {
    const posts = []
    const q = firestore.query(firestore.collection(database, "posts"), firestore.where("category", "==", category))
    const docs = await firestore.getDocs(q)
    docs.forEach((doc) => {
    // console.log(doc.data().username)
        posts.push(doc.data())
    })
    console.log(posts.toString())
    return posts
}

export default getCategoryPosts;
