import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { userState } from "@/store/user";
import { authStatusState } from "@/hooks/authFunctions";
import { auth } from "@/firebase/firebase";

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [status, setStatus] = useRecoilState(authStatusState);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          photoURL: user.photoURL as string,
        });
        setStatus("LOGGED_IN");
      } else {
        setUser({ uid: "", photoURL: "" }); // reset to user with empty UID
        setStatus("NOT_LOGGED_IN");
      }
    });
    return () => unSub();
  }, [setUser, setStatus]);

  return { user, status };
};
