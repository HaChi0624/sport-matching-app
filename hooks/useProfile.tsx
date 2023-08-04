import { useRef, useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useAuth } from "@/firebase/authFunctions";
import { db } from "@/firebase/firebase";

let fileImage: HTMLImageElement | undefined;

export const useProfile = () => {
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


  const { user, status } = useAuth();

  const [userName, setUserName] = useState("");
  const [favTeam, setFavTeam] = useState("");
  const [favPlayers, setFavPlayers] = useState("");
  const [comment, setComment] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // プロフィール取得
  useEffect(() => {
    if (status === "LOADING") {
      return;
    }
    const fetchUserName = async () => {
        const userSnapshot = await getDoc(doc(db, "users", user.uid));
        const userData = userSnapshot.data();
        if (userData) {
          setUserName(userData.userName);
          setFavTeam(userData.favTeam);
          setFavPlayers(userData.favPlayers);
          setComment(userData.comment);
          setPhotoURL(userData.photoURL);
        }
      // try {
      //   const userSnapshot = await getDoc(doc(db, "users", user.uid));
      //   const userData = userSnapshot.data();
      //   if (userData) {
      //     setUserName(userData.userName);
      //     setFavTeam(userData.favTeam);
      //     setFavPlayers(userData.favPlayers);
      //     setComment(userData.comment);
      //     setPhotoURL(userData.photoURL);
      //   }
      // } catch (error) {
      //   console.error("Error fetching user name:", error);
      // }
    };
    fetchUserName();
  }, [user]);

  return {
    // handleFiles,
    // imageContainerRef,
    userName,
    favTeam,
    favPlayers,
    comment,
    photoURL,
  };
};
