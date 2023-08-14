import { Box, Center, Container, Heading } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { useAuth } from "@/firebase/authFunctions";
import ProfilePage from "@/components/profilePage";

type Profile = {
  userName: string;
  favTeam: string;
  favPlayers: string;
  comment: string;
  photoURL: string;
};
const myProfilePage = () => {
  const { user, status } = useAuth();

  const [userName, setUserName] = useState("");
  const [favTeam, setFavTeam] = useState("");
  const [favPlayers, setFavPlayers] = useState("");
  const [comment, setComment] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  
  // onSnapshotで取得
  useEffect(() => {
    const fetchProfile = async () => {
      if (status === "LOADING") {
        return;
      }
      onSnapshot(doc(db, "users", user.uid), (doc) => {
        const userData = doc.data();
        if (userData) {
          setUserName(userData.userName);
          setFavTeam(userData.favTeam);
          setFavPlayers(userData.favPlayers);
          setComment(userData.comment);
          setPhotoURL(userData.photoURL);
        }
        // console.log(userData);
      });
    };
    fetchProfile();
  }, [user]);

  return (
    <Box width='360px' m='0 auto' pt="60px">
      <Heading className={styles.title} py={3}>
        My Profile
      </Heading>
      <ProfilePage
        photoURL={photoURL}
        userName={userName}
        favTeam={favTeam}
        favPlayers={favPlayers}
        comment={comment}
      />
    </Box>
  );
};

export default myProfilePage;
