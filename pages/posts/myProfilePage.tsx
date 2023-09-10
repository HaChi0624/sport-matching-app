import { Box, Center, Container, Heading } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import ProfileList from "@/components/myProfile/profileList";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/header";

type Profile = {
  userName: string;
  favTeam: string;
  favPlayers: string;
  comment: string;
  photoURL: string;
};
const MyProfilePage = () => {
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
  }, [user, status]);

  return (
    <>
      <Header />
      <Box width={["360px", "360px", "500px", "600px"]} m="0 auto" pt="60px">
        <Heading className={styles.title} py={3}>
          My Profile
        </Heading>
        <ProfileList
          photoURL={photoURL}
          userName={userName}
          favTeam={favTeam}
          favPlayers={favPlayers}
          comment={comment}
        />
      </Box>
    </>
  );
};

export default MyProfilePage;
