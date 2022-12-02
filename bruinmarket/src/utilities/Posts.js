import { firestore, database } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const getCategoryPosts = async (category) => {
  const posts = [];
  let q;
  if (!category || category === "All") {
    q = firestore.query(firestore.collection(database, "posts"));
  } else {
    q = firestore.query(
      firestore.collection(database, "posts"),
      firestore.where("category", "==", category)
    );
  }
  const docs = await firestore.getDocs(q);
  docs.forEach((doc) => {
    // console.log(doc.data().username)
    posts.push(doc.data());
  });
  console.log(posts.toString());
  return posts;
};

const getUserPosts = async (uid) => {
  const posts = [];

  let q = firestore.query(
    firestore.collection(database, "posts"),
    firestore.where("uid", "==", uid)
  );

  const docs = await firestore.getDocs(q);
  docs.forEach((doc) => {
    posts.push(doc.data());
  });
  console.log(posts.toString());
  return posts;
};

const getUserBoughtPosts = async (uid) => {
  const posts = [];

  let q = firestore.query(
    firestore.collection(database, "posts"),
    firestore.where("bought_uid", "==", uid)
  );

  const docs = await firestore.getDocs(q);
  docs.forEach((doc) => {
    posts.push(doc.data());
  });
  console.log(posts.toString());
  return posts;
};

const updatePostData = async (postID, userID, key, value) => {
  const q = firestore.query(
    firestore.collection(database, "posts"),
    firestore.where("post_id", "==", postID)
  );
  const docs = await firestore.getDocs(q);
  let targetid = null;
  docs.forEach((doc) => {
    targetid = doc.id;
  });
  const target = doc(database, "posts", targetid);
  await updateDoc(target, {
    [key]: value,
  });
};

const addUserBid = async (postID, userID, amount) => {
  const key = `offers.${userID}`;
  await updatePostData(postID, userID, key, amount);
};

const finalizeSale = async (postID, uid) => {
  await updatePostData(postID, uid, "bought_uid", uid);
  return uid;
};

const getBuyer = async (postID) => {
  const postData = await getPostData(postID);
  return postData.bought_uid;
};

const getBids = async (postID) => {
  const q = firestore.query(
    firestore.collection(database, "posts"),
    firestore.where("post_id", "==", postID)
  );
  const docs = await firestore.getDocs(q);
  let target = null;
  docs.forEach((doc) => {
    target = doc.data();
  });
  let bids = {};
  for (var user in target.offers) {
    bids[user] = target.offers[user];
    console.log(bids);
  }
  return bids;
};

const getPostData = async (postID) => {
  const q = firestore.query(
    firestore.collection(database, "posts"),
    firestore.where("post_id", "==", postID)
  );
  const docs = await firestore.getDocs(q);
  let target = null;
  docs.forEach((doc) => {
    target = doc.data();
  });
  return target;
};

async function getUserData(uid) {
  const q = firestore.query(
    firestore.collection(database, "users"),
    firestore.where("uid", "==", uid)
  );
  const docs = await firestore.getDocs(q);
  let data = null;
  docs.forEach((doc) => {
    // console.log(doc.data().username)
    data = doc.data();
  });
  console.log(data);
  return data;
}

export {
  getCategoryPosts,
  addUserBid,
  finalizeSale,
  getBids,
  getPostData,
  getUserData,
  getBuyer,
  getUserPosts,
  getUserBoughtPosts,
};
