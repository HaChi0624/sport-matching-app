import { Box, Container, Text, Image, Center, Avatar } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import goya from "src/goya.png";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

import RequestButton from "@/components/friendRequest/requestButton";
import { useProfile } from "@/hooks/useProfile";
import BeFriendButton from "@/components/friendRequest/beFriendButton";

type User = {
  id: string;
  userName: string;
  favTeam: string;
  favPlayers: string;
  comment: string;
};

const FriendProfilePage = () => {
  const [photoURL, setPhotoURL] = useState("");
  const [userName, setUserName] = useState("");
  const [favTeam, setFavTeam] = useState("");
  const [favPlayers, setFavPlayers] = useState("");
  const [comment, setComment] = useState("");

  const router = useRouter();
  // 型アサーションはいいの？
  const uid: string = router.query.id as string;

  useEffect(() => {
    const fetchUserName = async () => {
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
    fetchUserName();
  }, [uid]);

  // console.log(router.query.id)

  return (
    <Container>
      <Link href="/posts/friendList">戻る</Link>
      <Text className={styles.title} py={3}>
        Friend Profile
      </Text>
      <Box className={styles.box1}>
        <Center>
          <Avatar src={photoURL} w="240px" h="240px" />
        </Center>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* 申請するとき */}
          <RequestButton user2Id={uid} user2Name={userName} />
          {/* 申請を受けたとき　 user2のrequest=trueの時 */}
          <BeFriendButton user2Id={uid} user2Name={userName} />
        </Box>
        <Text className={styles.text}>名前</Text>
        <Box>{userName}</Box>
      </Box>

      <Box className={styles.box2}>
        <Text className={styles.text}>好きな球団</Text>
        <Box>{favTeam}</Box>
      </Box>
      <Box className={styles.box1}>
        <Text className={styles.text}>好きな選手※5人まで</Text>
        <Box>{favPlayers}</Box>
      </Box>
      <Box className={styles.box2}>
        <Text className={styles.text}>ひとこと</Text>
        <Box>{comment}</Box>
      </Box>
    </Container>
  );
};

export default FriendProfilePage;
