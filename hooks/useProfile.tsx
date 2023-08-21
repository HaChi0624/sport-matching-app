import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";

import { useAuth } from "@/firebase/authFunctions";
import { db } from "@/firebase/firebase";

// 一人分のプロフィール
export const useProfile = () => {
  const { user, status } = useAuth();

  const [userName, setUserName] = useState("");
  const [favTeam, setFavTeam] = useState("");
  const [favPlayers, setFavPlayers] = useState("");
  const [comment, setComment] = useState("");
  const [photoURL, setPhotoURL] = useState("");

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
    };
    fetchUserName();
  }, [user]);

  return {
    userName,
    favTeam,
    favPlayers,
    comment,
    photoURL,
  };
};
