import { useAuth } from "@/firebase/authFunctions";
import { db } from "@/firebase/firebase";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ChangeEventHandler, useRef, useState, useEffect } from "react";

let fileImage: HTMLImageElement | undefined;

export const useProfileCards = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [objectURL, setObjectURL] = useState("");

  //DOMの読み込みをしてからnew Image()の実行
  // useEffect(() => {
  //   fileImage = new Image();
  // }, []);

  // const resetSelection = () => {
  //   if (fileImage) {
  //     fileImage.src = "";
  //     const imageContainer = imageContainerRef.current;
  //     if (imageContainer && fileImage.parentNode === imageContainer) {
  //       imageContainer.removeChild(fileImage);
  //     }
  //   }
  //   if (objectURL) {
  //     window.URL.revokeObjectURL(objectURL);
  //     setObjectURL("");
  //   }
  // };

  // const handleFiles: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   const files = event.currentTarget.files;
  //   resetSelection();
  //   if (!files || files?.length === 0) return;
  //   const file = files[0];
  //   if (!file.type.includes("image/")) {
  //     event.currentTarget.value = "";
  //     return;
  //   }

  //   const imageContainer = imageContainerRef.current;
  //   if (!imageContainer) return;
  //   const objectURL = window.URL.createObjectURL(file);
  //   if (fileImage) {
  //     fileImage.src = objectURL;
  //     imageContainer.appendChild(fileImage);
  //     setObjectURL(objectURL);
  //   }
  // };

  //ユーザーid
  const currentUser = useAuth();

  const [userName, setUserName] = useState("");
  const [favTeam, setFavTeam] = useState("");
  const [favPlayers, setFavPlayers] = useState("");
  const [comment, setComment] = useState("");
  // const favTeam = "東映フライヤーズ";
  // const favPlayers = "ブーマー、ブラゼル、ブランコ、ブキャナン、ブセニッツ";
  // const comment =
  //   "侍ジャパンから野球に興味を持ちました！まだまだ知らないことばかりですが、仲良くしてください！";

  // プロフィール取得
  useEffect(() => {
    if (currentUser) {
      const fetchUserName = async () => {
        try {
          const userSnapshot = await getDoc(doc(db, "users", currentUser.uid));
          const userData = userSnapshot.data();
          if (userData) {
            setUserName(userData.userName);
            setFavTeam(userData.favTeam);
            setFavPlayers(userData.favPlayers);
            setComment(userData.comment);
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      };
      fetchUserName();
    }
  }, [currentUser]);

  // プロフィールの追加
  // const createProfile = async () => {
  //   await setDoc(doc(db, "users", currentUser.uid), {
  //     favTeam: favTeam,
  //     favPlayers: favPlayers,
  //     comment: comment,
  //     // createdAt: serverTimestamp(),
  //   });
  //   setFavTeam("");
  //   setFavPlayers("");
  //   setComment("");
  // };

  

  return {
    // handleFiles,
    // imageContainerRef,
    userName,
    favTeam,
    favPlayers,
    comment,
    // createProfile,
  };
};
