import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { signInUserState } from "../store/auth";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import router, { Router } from "next/router";
import { doc, setDoc } from "firebase/firestore";

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
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        //userが戻り値として返ってくるので、それをuserに代入
        const user = result.user; //userに値が入っていれば

        if (user) {
          //userの中にあるuidをuidに代入
          const uid = user.uid;

          //firestoreのusersというコレクションに、uidをドキュメントIDとしてもつ、 userInitialDataを登録する
          setDoc(doc(db, "users", uid), {
            uid: uid,
            email: email,
            userName: userName,
          });
          console.log("ユーザーが作成されました!");
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

/**
 * SignInの状態を監視する
 */
// onAuthStateChangedでユーザーのログイン状態を監視し、
// ログイン状態なら（authUserが取得できたら）、
// setSignInUserを使ってRecoil Stateにuidを保存します。
// ログアウト状態なら、resetStatusを使ってRecoil Stateの状態を初期化します。

export const useAuth = () => {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const resetStatus = useResetRecoilState(signInUserState);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setSignInUser({
          uid: user.uid,
        });
      } else {
        resetStatus();
      }
    });
    return () => unSub();
  }, [setSignInUser, resetStatus]);

  return signInUser;
};
