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
  const [friendList, setFriendList] = useState<User[]>([]);

  //　requestされているidを取得
  useEffect(() => {
    const fetchIdData = async () => {
      if (status === "LOADING") {
        return;
      }
      try {
        const collectionRef = collection(db, "users", user.uid, "friends");
        if (collectionRef) {
          const querySnapshot = await getDocs(
            query(collectionRef, where("request", "==", true))
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

  // friends = trueを取得
  useEffect(() => {
    const fetchIdData = async () => {
      if (status === "LOADING") {
        return;
      }
      try {
        const collectionRef = collection(db, "users", user.uid, "friends");
        if (collectionRef) {
          const querySnapshot = await getDocs(
            query(collectionRef, where("friend", "==", true))
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

  // 友達申請されているIDを取得
  useEffect(() => {
    const newRequestData = users.filter((user) => idData.includes(user.uid));
    setRequestList(newRequestData);
  }, [idData, users]);

  // friend取得
  useEffect(() => {
    const newFriendsData = users.filter((user) => idData.includes(user.uid));
    setFriendList(newFriendsData);
  }, [idData, users]);

  // likeのstateがtrueの場合に表示されるようにしたい
  return (
    <>
      <Container py="16px" maxW={["90%", "90%", "80%", "70%"]}>
        <Text>グッドされました</Text>
        <p>friendsコレクションがそもそも追加されていないから意味がない。requestButtonでuser2にも追加する必要がある。</p>
        <HStack h="20">
          {requestList.map((requester) => (
            <Link
              key={requester.uid}
              href={`/posts/friendProfilePage/${requester.uid}`}
            >
              <Avatar src={requester.photoURL} w="64px" h="64px" />
            </Link>
          ))}
        </HStack>
        {/* users.uidと */}
        <Text fontSize="4xl">友達一覧</Text>
        <Input placeholder="検索" />
        <Box mt="8px">
          {friendList.map((user) => (
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
