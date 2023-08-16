import {
  Avatar,
  Box,
  Container,
  Divider,
  HStack,
  Image,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/firebase/authFunctions";
import { db } from "@/firebase/firebase";
import { ChatIcon } from "@chakra-ui/icons";
import SearchedList from "@/components/search/searchedList";

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
  const [searchedList, setSearchedList] = useState<User[]>(friendList);
  const [inputValue, setInputValue] = useState("");

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


  // searchUsersの初期値を設定
  useEffect(() => {
    setSearchedList(friendList);
    // console.log(`searchUsers: ${searchUsers}`);
  }, [friendList]);

  // 検索欄への入力値をハンドリング
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    search(e.target.value);
  };

  const search = (value: string) => {
    const serchedFriends = friendList.filter(
      (user) => user.userName.toUpperCase().indexOf(value.toUpperCase()) > -1
    );
    setSearchedList(serchedFriends);
  };

  return (
    <>
      <Container pt="60px" maxW={["90%", "90%", "80%", "600px"]}>
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
          <Input
            placeholder="検索"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Box mt="8px">
            {searchedList.map((user) => (
              <Box key={user.uid}>
                <HStack h="20">
                  <Avatar src={user.photoURL} w="64px" h="64px" />
                  <Link
                    href={`/posts/friendProfilePage/${user.uid}`}
                    pl="16px"
                    fontSize={"18px"}
                  >
                    {user.userName}
                  </Link>
                  <Spacer />
                  <Text>最新ログイン：２日前</Text>
                  <Spacer />

                  <Link href={`/posts/chat/${user.uid}`}>
                    <ChatIcon />
                  </Link>
                </HStack>
                <Divider />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default friendList;
