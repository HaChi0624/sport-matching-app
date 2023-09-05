import { ChangeEvent, useState } from "react";
import { atom } from "recoil";
import router from "next/router";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { auth, db, provider } from "../firebase/firebase";

export const useAuthFunction = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/posts/Top");
    } catch (error) {
      alert("サインイン認証に失敗しました。authfunction.tsx");
    }
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const loginWithGoogle = async () => {
    try {
      signInWithPopup(auth, provider);
      router.push("/posts/Top");
    } catch (error) {
      console.error("ユーザー作成エラー:", error);
    }
  };
  return {
    // email & password
    handleLogin,
    handleChangeEmail,
    handleChangePassword,
    //google, facebook, X
    loginWithGoogle,
  };
};


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
