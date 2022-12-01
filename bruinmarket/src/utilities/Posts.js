import { firestore, database } from "../firebase"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"    

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

const addUserBid = async (postID, userID, amount) => {
    const key = `offers.${userID}`
    console.log(key)
    const q = firestore.query(
        firestore.collection(database, "posts"),
        firestore.where("uid", "==", postID)
    );
    const docs = await firestore.getDocs(q);
    let targetid = null;
    docs.forEach((doc) => {
      targetid = doc.id
    })
    console.log(targetid)
    const target = doc(database, "posts", targetid)
    await updateDoc(target, {
        [key] : amount
    });
}

export {getCategoryPosts, addUserBid};
