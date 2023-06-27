import { Box, Container, Text, Image, Center, Button } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import goya from "src/goya.png";
import { useEffect, useState } from "react";
import { useProfileCards } from "@/hooks/useProfileCards";
import { useRouter } from "next/router";
import { DocumentReference, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Link from "next/link";

type User = {
  id: string;
  userName: string;
  favTeam: string;
  favPlayers: string;
  comment: string;
};

const FriendProfilePage = () => {
  const [userName, setUserName] = useState("");
  const [favTeam, setFavTeam] = useState("");
  const [favPlayers, setFavPlayers] = useState("");
  const [comment, setComment] = useState("");

  const router = useRouter();
  useEffect(() => {
    const fetchUserName = async () => {
      if (router.query.id) {
        const userSnapshot = await getDoc(doc(db, "users", router.query.id));
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserName(userData.userName);
          setFavTeam(userData.favTeam);
          setFavPlayers(userData.favPlayers);
          setComment(userData.comment);
        }
      }
    };

    fetchUserName();
  }, [router.query.id]);

  // console.log(router.query.id)

  return (
    <Container>
      <Link href='/posts/friendList'>戻る</Link>
      <Text className={styles.title} py={3}>
        Friend Profile
      </Text>
      <Box className={styles.box1}>
        <Center>
          <Image src={goya.src} alt="picture" w="240px" h="240px" />
        </Center>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button mr="1" bgColor={"rgb(225, 218, 218)"}>
            いいね
          </Button>
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
