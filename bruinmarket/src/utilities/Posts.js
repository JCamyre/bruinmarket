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

const updatePostData = async (postID, userID, key, value) => {
    const q = firestore.query(
        firestore.collection(database, "posts"),
        firestore.where("post_id", "==", postID)
    );
    const docs = await firestore.getDocs(q);
    let targetid = null;
    docs.forEach((doc) => {
      targetid = doc.id
    })
    const target = doc(database, "posts", targetid)
    await updateDoc(target, {
        [key] : value
    });
}

const addUserBid = async (postID, userID, amount) => {
    const key = `offers.${userID}`
    await updatePostData(postID, userID, key, amount)
}

const finalizeSale = async (postID, uid) => {
    await updatePostData(postID, uid, "bought_uid", uid)
}

export {getCategoryPosts, addUserBid, finalizeSale};
