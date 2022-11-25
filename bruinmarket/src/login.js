import {app, auth, database, authentication, firestore} from "./firebase"

const login = async (email, password, setStatus) => {
    try {
        await authentication.signInWithEmailAndPassword(auth, email, password).then(() => {return 0})
    } catch(e) {
        console.log(e.code)
        switch (e.code) {
            case 'auth/user-disabled':
                return 1
            case 'auth/invalid-email':
                return 2
            case 'auth/user-not-found':
                return 3               
            case 'auth/wrong-password':
                return 4               
            default:
                return 5
        }
    }
}

export default login