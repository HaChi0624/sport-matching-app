import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { signInUserState } from "../store/auth";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
// export const signUp = async (email: string, password: string) => {
//     try {
//         await createUserWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//         alert('ユーザー登録に失敗しました。');
//     }
// };

/**
 * サインアウトする
 */
export const signOut = async () => {
  try {
    await auth.signOut();
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
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setSignInUser({
          uid: authUser.uid,
        });
      } else {
        resetStatus();
      }
    });
    return () => unSub();
  }, [setSignInUser, resetStatus]);

  return signInUser;
};
