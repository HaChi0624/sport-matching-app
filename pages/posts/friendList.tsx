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
  const [requestedIdData, setRequestedIdData] = useState<string[]>([]);
  const [friendIdData, setFriendIdData] = useState<string[]>([]);
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
            query(collectionRef, where("requested", "==", true))
          );
          const newIdData: string[] = [];
          querySnapshot.forEach((doc) => {
            newIdData.push(doc.data().uid);
          });
          setRequestedIdData(newIdData);
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
          setFriendIdData(newIdData);
        }
      } catch (error) {
        console.error("Error fetching friendList:", error);
      }
    };
    fetchIdData();
  }, [user.uid]);

  // 友達申請されているIDを取得
  useEffect(() => {
    if (status === "LOADING") {
      return;
    }
    const newRequestData = users.filter((user) =>
      requestedIdData.includes(user.uid)
    );
    setRequestList(newRequestData);
    // console.log(`requestedIdData: ${requestedIdData}`)
  }, [requestedIdData, users]);

  // friend取得
  useEffect(() => {
    if (status === "LOADING") {
      return;
    }
    const newFriendsData = users.filter((user) =>
      friendIdData.includes(user.uid)
    );
    setFriendList(newFriendsData);
    console.log(`friendIdData: ${friendIdData}`);
  }, [friendIdData, users]);

  // likeのstateがtrueの場合に表示されるようにしたい
  return (
    <>
      <Container py="16px" maxW={["90%", "90%", "80%", "70%"]}>
        {/* requested */}
        <Box border={"1px"} borderRadius={"20px"} p="10px 20px" mb="20px">
          <Text fontSize={"24px"}>グッドされました！</Text>
          <Text>
            リンク先で友達になるを押すと友達一覧に表示されるようになります。
          </Text>
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
        </Box>

        {/* friend */}
        <Box>
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
        </Box>
      </Container>
    </>
  );
};

export default friendList;
