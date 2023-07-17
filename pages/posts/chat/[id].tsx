import { useAuth } from "@/firebase/authFunctions";
import { db } from "@/firebase/firebase";
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
} from "@chakra-ui/react";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
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
  const currentUser = useAuth();

  const user1Id: string = currentUser.uid
  const user2Id: string = router.query.id as string;
  const user1Name = "aaa";
  const [user2Name, setUser2Name] = useState("");
  const [inputMsg, setInputMsg] = useState("");
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([
    {
      key: "1",
      name: "m.t",
      msg: "めっせーじ",
      date: new Date(),
    },
    {
      key: "2",
      name: "m.t",
      msg: "めっせーじdayo",
      date: new Date(),
    },
    {
      key: "3",
      name: "m.t",
      msg: "めっせーじomg",
      date: new Date(),
    },
    {
      key: "4",
      name: "m.t",
      msg: "めっせーじomg",
      date: new Date(),
    },
    {
      key: "5",
      name: "m.t",
      msg: "めっせーじomg",
      date: new Date(),
    },
    {
      key: "6",
      name: "m.t",
      msg: "めっせーじomg",
      date: new Date(),
    },
    {
      key: "7",
      name: "m.t",
      msg: "めっせーじomg",
      date: new Date(),
    },
  ]);

  //いらなかったっら消す
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);


  // confirm id and get user2name
  useEffect(() => {
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
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const fetchRoomId = async () => {
      if (user1Id && user2Id) {
        const friendSnapshot = await getDoc(
          doc(db, "users", user1Id, "friends", user2Id)
        );
        if (friendSnapshot.exists()) {
          const friendData = friendSnapshot.data();
          setRoomId(friendData.roomId);
        }
        console.log("friendSnapshot:", friendSnapshot);
      }
    };
    fetchRoomId();
  }, [user2Id]);
  console.log(roomId);

  // チャット追加

  // チャット取得

  // 時間
  const formatHHMM = (time: Date) => {
    return new Date(time).toTimeString().slice(0, 5);
  };

  return (
    <>
      <Container>
        <Heading>{user2Name}{roomId}</Heading>
        {chatLogs.map((item) => (
          <Box
            // className={`balloon_${userName === item.name ? "r" : "l"}`}
            key={item.key}
          >
            <HStack style={{ marginLeft: "3px" }}>
              <Box textAlign="center">
                <Avatar />
                {user1Name === item.name ? (
                  <HStack>
                    <Box>
                      {user1Name === item.name ? formatHHMM(item.date) : ""}
                    </Box>
                    <Box>{user1Name}</Box>
                  </HStack>
                ) : (
                  <HStack>
                    <Box>{user2Name}</Box>
                    <Box>
                      {user2Name === item.name ? formatHHMM(item.date) : ""}
                    </Box>
                  </HStack>
                )}
              </Box>
              <Text className="says">{item.msg}</Text>
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
