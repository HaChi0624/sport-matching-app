import {
  Avatar,
  Box,
  Divider,
  HStack,
  Input,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/firebase/authFunctions";
import { db } from "@/firebase/firebase";
import { ChatIcon } from "@chakra-ui/icons";
type User = {
  uid: string;
  userName: string;
  photoURL: string;
};
const FriendList = () => {
    const { user, status } = useAuth();
  const { users } = useUsers();
  const [friendIdData, setFriendIdData] = useState<string[]>([]);
  const [friendList, setFriendList] = useState<User[]>([]);
  const [searchedList, setSearchedList] = useState<User[]>(friendList);
  const [inputValue, setInputValue] = useState("");


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
            query(collectionRef, where("friendStatus", "==", "friend"))
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
  }, [user.uid, status]);


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
  }, [friendIdData, users, status]);

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
    const searchedFriends = friendList.filter(
      (user) => user.userName.toUpperCase().indexOf(value.toUpperCase()) > -1
    );
    setSearchedList(searchedFriends);
  };
  return (
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
  );
};

export default FriendList;
