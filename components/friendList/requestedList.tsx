import { Avatar, Box, HStack, Link, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useUsers } from "@/hooks/useUsers";
import { db } from "@/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";

type User = {
  uid: string;
  userName: string;
  photoURL: string;
};

const RequestedList = () => {
  const { user, status } = useAuth();
  const { users } = useUsers();
  const [requestedIdData, setRequestedIdData] = useState<string[]>([]);
  const [requestList, setRequestList] = useState<User[]>([]);

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
            query(collectionRef, where("friendStatus", "==", "requested"))
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
  }, [user.uid, status]);

  // 友達申請されているIDと一致するユーザーリストを取得
  useEffect(() => {
    if (status === "LOADING") {
      return;
    }
    const newRequestData = users.filter((user) =>
      requestedIdData.includes(user.uid)
    );
    setRequestList(newRequestData);
    // console.log(`requestedIdData: ${requestedIdData}`)
  }, [requestedIdData, users, status]);

  return (
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
  );
};

export default RequestedList;
