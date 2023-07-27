import { useAuth } from "@/firebase/authFunctions";
import { db } from "@/firebase/firebase";
import { useProfile } from "@/hooks/useProfile";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ChatLog = {
  key: string;
  name: string;
  msg: string;
  date: Date;
};

const FriendChat = () => {
  const router = useRouter();
  const { user, status } = useAuth();
  const { userName } = useProfile();

  const user1Id: string = user.uid;
  const user2Id: string = router.query.id as string;
  const user1Name = userName;
  const [roomId, setRoomId] = useState("");
  const [user2Name, setUser2Name] = useState("");
  const [inputMsg, setInputMsg] = useState("");
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([
    {
      key: "1",
      name: "nannan",
      msg: "めっせーじ",
      date: new Date(),
    },
    {
      key: "2",
      name: "ikeike",
      msg: "めっせーじdayo",
      date: new Date(),
    },
    {
      key: "3",
      name: "ikeike",
      msg: "めっせーじmg",
      date: new Date(),
    },
    {
      key: "4",
      name: "aaa",
      msg: "gasgasg",
      date: new Date(),
    },
    {
      key: "5",
      name: "denden",
      msg: "gaajaklgmg",
      date: new Date(),
    },
    {
      key: "6",
      name: "cancan",
      msg: "k;kjio",
      date: new Date(),
    },
    {
      key: "7",
      name: "m.t",
      msg: "kajreoajg",
      date: new Date(),
    },
  ]);

  //  get user2name
  useEffect(() => {
    // if (status === "LOADING") {
    //   return;
    // }
    const fetchUser2Name = async () => {
      if (user2Id) {
        const userSnapshot = await getDoc(doc(db, "users", user2Id));
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUser2Name(userData.userName);
        }
      }
    };
    fetchUser2Name();
  }, [user2Id]);

  // roomId
  // 出来てない

  useEffect(() => {
    const fetchRoomId = async () => {
      const collectionRef = collection(db, "users", user1Id, "friends");
      const querySnapshot = await getDocs(
        query(collectionRef, where("uid", "==", user2Id))
      );
      querySnapshot.forEach((doc) => {
        setRoomId(doc.id)
      })
    };
    fetchRoomId();
  }, [user2Id]);

  // チャット追加

  // チャット取得

  // 時間
  const formatHHMM = (time: Date) => {
    return new Date(time).toTimeString().slice(0, 5);
  };

  return (
    <>
      <Container>
        <Heading>
          <Box>user1Name: {user1Name}</Box>
          <Box>user2Name: {user2Name}</Box>
          <Box>roomId: {roomId}</Box>
        </Heading>
        {chatLogs.map((item) => (
          <Box key={item.key}>
            <HStack style={{ marginLeft: "3px" }}>
              {user1Name === item.name ? (
                <>
                  <Text fontSize={"24px"} className="says">
                    {item.msg}
                  </Text>
                  <VStack>
                    <Avatar />
                    <HStack>
                      <Box fontSize={"20px"}>{item.name}</Box>
                      <Box>
                        {item.name === user1Name ? formatHHMM(item.date) : ""}
                      </Box>
                    </HStack>
                  </VStack>
                </>
              ) : (
                <>
                  <VStack>
                    <Avatar />
                    <HStack>
                      <Box>{item.name}</Box>
                      <Box>
                        {item.name !== user1Name ? formatHHMM(item.date) : ""}
                      </Box>
                    </HStack>
                  </VStack>
                  <Text fontSize={"24px"} className="says">
                    {item.msg}
                  </Text>
                </>
              )}
            </HStack>
          </Box>
        ))}

        <Box>
          <form>
            <FormControl
              className="chatform"
              // onSubmit={async (e) => {
              //   e.preventDefault();
              //   await submitMsg();
              // }}
            >
              <Input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
              />
            </FormControl>
            <Button
              // onClick={() => submitMsg}
              type="submit"
            >
              送信
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};
export default FriendChat;
