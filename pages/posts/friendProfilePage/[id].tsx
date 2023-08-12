import {
  Box,
  Container,
  Text,
  Image,
  Center,
  Avatar,
  HStack,
  Spacer,
  Divider,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Portal,
  VStack,
} from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import goya from "src/goya.png";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

import RequestButton from "@/components/friendRequest/requestButton";
import { useProfile } from "@/hooks/useProfile";
import BeFriendButton from "@/components/friendRequest/beFriendButton";
import { ChatIcon, SettingsIcon } from "@chakra-ui/icons";

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
    <Container>
      <Link href="/posts/friendList">戻る</Link>
      <Text className={styles.title} py={3}>
        Friend Profile
      </Text>
      <VStack className={styles.box1}>
        <Center>
          <Avatar src={photoURL} w="240px" h="240px" />
        </Center>

        <HStack style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* チャット */}
          <Link href={`/posts/chat/${uid}`}>
            <ChatIcon />
          </Link>
          <Spacer />
          {/* 申請など */}
          <Popover>
            <PopoverTrigger>
              <SettingsIcon />
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <VStack>
                    {/* 申請するとき */}
                    <RequestButton user2Id={uid} user2Name={userName} />
                    {/* 申請を受けたとき　 user2のrequest=trueの時 */}
                    <BeFriendButton user2Id={uid} user2Name={userName} />
                    {/* 友達解除 */}
                    <Button>友達解除</Button>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </HStack>
      </VStack>

      {/* プロフィール情報 */}
      {profileData.map((item, index) => (
        <Box p="4px">
          <HStack key={index}>
            <Box>
              <Text>{item.label}</Text>
              <Text fontWeight={"bold"}>{item.value}</Text>
            </Box>
            <Spacer />
          </HStack>
          <Divider p="4px" />
        </Box>
      ))}
    </Container>
  );
};

export default FriendProfilePage;
