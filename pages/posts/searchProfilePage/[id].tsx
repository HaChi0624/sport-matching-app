import {
  Box,
  Container,
  Text,
  Avatar,
  Spacer,
  Button,
} from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

import BeFriendButton from "@/components/friendRequest/beFriendButton";
import UserProfileInfo from "@/components/search/userProfileInfo";
import Header from "@/components/header/header";

type User = {
  id: string;
  userName: string;
  favTeam: string;
  favPlayers: string;
  comment: string;
};

const SearchProfilePage = () => {
  const [photoURL, setPhotoURL] = useState("");
  const [userName, setUserName] = useState("");
  const [favTeam, setFavTeam] = useState("");
  const [favPlayers, setFavPlayers] = useState("");
  const [comment, setComment] = useState("");

  const router = useRouter();
  // 型アサーションはいいの？
  const uid: string = router.query.id as string;

  useEffect(() => {
    const fetchUserData = async () => {
      if (uid) {
        const userSnapshot = await getDoc(doc(db, "users", uid));
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setPhotoURL(userData.photoURL);
          setUserName(userData.userName);
          setFavTeam(userData.favTeam);
          setFavPlayers(userData.favPlayers);
          setComment(userData.comment);
        }
      }
    };
    fetchUserData();
  }, [uid]);

  // console.log(router.query.id)

  const profileData = [
    {
      label: "名前",
      value: userName,
    },
    {
      label: "好きな球団",
      value: favTeam,
    },
    {
      label: "好きな選手",
      value: favPlayers,
    },
    {
      label: "ひとこと",
      value: comment,
    },
  ];

  return (
    <>
      <Header />
      <Container pt="60px">
        <Text className={styles.title} py={3}>
          Profile
        </Text>

        <Box>
          <Avatar
            src={photoURL}
            w={["340px", "340px", "440px", "540px"]}
            h={["340px", "340px", "440px", "540px"]}
          />
          <Spacer />
        </Box>

        <Button onClick={() => router.push("/posts/searchPage")}>
          探すページに戻る
        </Button>
        <BeFriendButton user2Id={uid} user2Name={userName} />

        {/* プロフィール情報 */}
        <Box className={styles.profileData}>
          {profileData.map((item, index) => (
            <UserProfileInfo
              key={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default SearchProfilePage;
