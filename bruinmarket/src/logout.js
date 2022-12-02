import { authentication, auth } from "./firebase";

const logout = () => {
  try {
    authentication.signOut(auth).then(() => {
      return 0;
    });
  } catch (e) {
    return 1;
  }
};

export default logout;
