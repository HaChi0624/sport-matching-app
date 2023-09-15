import { ChangeEvent, FormEvent, useState } from "react";
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
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ログイン
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await router.push("/posts/Top");
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("正しいメールアドレスの形式で入力してください。");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("メールアドレスかパスワードに誤りがあります。");
          break;
        default:
          setError("メールアドレスかパスワードに誤りがあります。");
          break;
      }
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  // グーグルログイン
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider).then(
        (result) => {
          const user = result.user;
          // usersに追加
          if (user) {
            const uid = user.uid;
            setDoc(doc(db, "users", uid), {
              uid: uid,
              email: 'google',
              userName: '',
            });
          }
        }
      )
      router.push("/posts/Top");
    } catch (error) {
      console.error("ユーザー作成エラー:", error);
    }
  };

  //新規登録
  const signUp = async (userName: string, email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (result) => {
          const user = result.user;
          // usersに追加
          if (user) {
            const uid = user.uid;
            setDoc(doc(db, "users", uid), {
              uid: uid,
              email: email,
              userName: userName,
            });
          } else {
            alert('ユーザー情報が取得できませんでした。')
          }
        }
      );
    } catch (error: any) {
      switch (error.code) {
        case "auth/network-request-failed":
          setError(
            "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。"
          );
          break;

        case "auth/weak-password":
          setError("パスワードが短すぎます。6文字以上を入力してください。");
          break;

        case "auth/invalid-email":
          setError("メールアドレスが正しくありません");
          break;

        case "auth/email-already-in-use":
          setError(
            "メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください"
          );
          break;

        default:
          setError(
            "アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。"
          );
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(userName, email, password);
    router.push("/posts/Top");
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  return {
    // email & password
    handleLogin,
    handleChangeEmail,
    handleChangePassword,
    error,
    //google, facebook, X
    loginWithGoogle,
    // signUp
    handleSubmit,
    handleChangeName,
  };
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
