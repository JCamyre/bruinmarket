import {app, auth, database, authentication, firestore} from "./firebase"

const register = async (username, email, password, setStatus) => //returns false if registration is in valid (e.g. if account already exists)
{
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
                    email
            }).then(() => {setStatus(0)})
        // } else {
        //     return false
        // }
    } catch(e) {
        console.log(e.code)
        switch (e.code) {
            case 'auth/email-already-in-use':
                setStatus(1)
                break
            case 'auth/invalid-email':
                setStatus(2)
                break
            case 'auth/operation-not-allowed':
                setStatus(3)
                break
            case 'auth/weak-password':
                setStatus(4)
                break
            default:
                setStatus(5)
        }

    }
}

export default register