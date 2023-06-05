import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const LogOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
    return ;
};

export default LogOut;
