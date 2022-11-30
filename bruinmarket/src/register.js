import {auth, database, authentication, firestore} from "./firebase"

const register = async (username, email, password) => //returns false if registration is in valid (e.g. if account already exists)
{
    if (!(email.endsWith("@g.ucla.edu") /*|| email.endsWith("@ucla.edu")*/)) {
        return -1
    }
    try {
        const result = await authentication.createUserWithEmailAndPassword(auth, email, password)
        const newUser = result.user
        // const checkQuery = firestore.query(firestore.collection(database, "users"), firestore.where("username", "==", username))
        // const existingUser = await firestore.getDocs(checkQuery) //check if user already exists
        // if (existingUser.docs.length === 0) {
            await firestore.addDoc(firestore.collection(database, "users"), 
            {
                    uid: newUser.uid,
                    username,
                    authProvider: "local",
                    email,
                    numReviews: 0,
                    rating: 5
            }).then(() => {return 0})
        // } else {
        //     return false
        // }
    } catch(e) {
        console.log(e.code)
        switch (e.code) {
            case 'auth/email-already-in-use':
                return 1
            case 'auth/invalid-email':
                return 2
            case 'auth/operation-not-allowed':
                return 3
            case 'auth/weak-password':
                return 4
            default:
                return 5
        }

    }
}

export default register