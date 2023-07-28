import {
  Avatar,
  Box,
  Container,
  HStack,
  Image,
  Input,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";

import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/firebase/authFunctions";
import { db } from "@/firebase/firebase";

type User = {
  uid: string;
  userName: string;
  photoURL: string;
};

const friendList = () => {
  const { user, status } = useAuth();
  const { users } = useUsers();
  const [idData, setIdData] = useState<string[]>([]);
  const [requestList, setRequestList] = useState<User[]>([]);

  //　likeにしているidを取得
  // likeではない申請用の変数に変えたい
  // 申請に対する対応を行った場合、変数をfalseにしてリストに載らないようにする
  useEffect(() => {
    const fetchIdData = async () => {
      if (status === "LOADING") {
        return;
      }
      try {
        const collectionRef = collection(db, "users", user.uid, "friends");
        if (collectionRef) {
          const querySnapshot = await getDocs(
            query(collectionRef, where("like", "==", true))
          );
          const newIdData: string[] = [];
          querySnapshot.forEach((doc) => {
            newIdData.push(doc.data().uid);
          });
          setIdData(newIdData);
        }
      } catch (error) {
        console.error("Error fetching requestList:", error);
      }
    };
    fetchIdData();
  }, [user.uid]);

  // idが一致するものを取得
  useEffect(() => {
    const newUsersData = users.filter((user) => idData.includes(user.uid));
    setRequestList(newUsersData);
  }, [idData, users]);

  // likeのstateがtrueの場合に表示されるようにしたい
  return (
    <>
      <Container py="16px" maxW={["90%", "90%", "80%", "70%"]}>
        <Text>グッドされました</Text>
        <HStack h="20">
          {requestList.map((friend) => (
            <Link
              key={friend.uid}
              href={`/posts/friendProfilePage/${friend.uid}`}
            >
              <Avatar src={friend.photoURL} w="64px" h="64px" />
            </Link>
          ))}
        </HStack>
        {/* users.uidと */}
        <Text fontSize="4xl">友達一覧</Text>
        <Input placeholder="検索" />
        <Box mt="8px">
          {users.map((user) => (
            <HStack h="20" key={user.uid}>
              <Avatar src={user.photoURL} w="64px" h="64px" />
              <Box>
                <Link href={`/posts/friendProfilePage/${user.uid}`}>
                  {user.userName}
                </Link>
                <Text>最新ログイン：２日前</Text>
              </Box>
              <Link href={`/posts/chat/${user.uid}`}>チャット</Link>
            </HStack>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default friendList;
