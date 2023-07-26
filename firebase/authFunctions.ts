import { useEffect } from "react";
import { useRecoilState, atom } from "recoil";
import router, { Router } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "./firebase";
import { userState } from "@/store/user";

//import しようとしたけど上手くいかなかった
/**
 * ユーザー認証する
 */
// export const signIn = async (email: string, password: string) => {
//     try {
//         await signInWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//         alert('サインイン認証に失敗しました。authfunction.tsx');
//     }
// };

/**
 * ユーザー登録する
 */
export const signUp = async (
  userName: string,
  email: string,
  password: string
  // setMyUid: (uid: string) => void
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          setDoc(doc(db, "users", uid), {
            uid: uid,
            email: email,
            userName: userName,
          });
          // setMyUid(uid);
          // console.log(myUid)
        }
      }
    );
  } catch (error) {
    console.error("ユーザー作成エラー:", error);
  }
};

/**
 * サインアウトする
 */
export const signOut = async () => {
  try {
    await auth.signOut();
    router.push("/");
  } catch (error) {
    alert("サインアウトに失敗しました。");
  }
};



// Auth status state
export const authStatusState = atom({
  key: "authStatusState",
  default: "LOADING", // LOADING, LOGGED_IN, NOT_LOGGED_IN
});

// Custom hook
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
