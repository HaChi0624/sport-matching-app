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

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseError } from "firebase/app";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp,
  setDoc,
  onSnapshot,
  FieldValue,
} from "firebase/firestore";

import { useAuth } from "@/firebase/authFunctions";
import { db } from "@/firebase/firebase";
import { useProfile } from "@/hooks/useProfile";

type ChatLog = {
  key: string;
  userName: string;
  uid: string;
  msg: string;
  createdAt: Date;
};

const FriendChat = () => {
  const router = useRouter();
  const { user, status } = useAuth();
  const { userName, photoURL } = useProfile(); //user1のデータ

  const user1Id: string = user.uid;
  const user2Id: string = router.query.id as string;
  const user1Name = userName;
  const [roomId, setRoomId] = useState("");
  const [user2Name, setUser2Name] = useState("");
  const [user2PhotoURL, setUser2PhotoURL] = useState("");
  const [inputMsg, setInputMsg] = useState("");
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);

  //  get user2name and photoURL
  useEffect(() => {
    const fetchUser2Name = async () => {
      if (user2Id) {
        const userSnapshot = await getDoc(doc(db, "users", user2Id));
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUser2Name(userData.userName);
          setUser2PhotoURL(userData.photoURL);
        }
      }
    };
    fetchUser2Name();
  }, [user2Id]);

  // roomId

  useEffect(() => {
    const fetchRoomId = async () => {
      if (status === "LOADING") {
        return;
      }
      const collectionRef = collection(db, "users", user1Id, "friends");
      const querySnapshot = await getDocs(
        query(collectionRef, where("uid", "==", user2Id))
      );
      querySnapshot.forEach((doc) => {
        setRoomId(doc.data().roomId);
      });
      // console.log(`roomId: ${roomId}`);
    };
    fetchRoomId();
  }, [user1Id, user2Id]);

  // チャット追加
  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "chat", roomId, "chatLog"), {
        key: Math.random(),
        uid: user1Id,
        userName: user1Name,
        msg: inputMsg,
        createdAt: serverTimestamp(),
      });
      setInputMsg("");
      // console.log(`id: ${docRef.id}`);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };

  // チャット取得
  // 10件取得
  // 第二引数何入れるか　chatLogsはだめ
  // onSnapshotを検討
  useEffect(() => {
    const fetchChatLog = async () => {
      if (!roomId) {
        return;
      }
      if (status === "LOADING") {
        return;
      }
      onSnapshot(collection(db, "chat", roomId, "chatLog"), (snapshot) => {
        const chatRef: ChatLog[] = [];
        snapshot.docs.map((doc) => {
          const chat = {
            key: doc.data().key,
            uid: doc.data().uid,
            userName: doc.data().userName,
            msg: doc.data().msg,
            createdAt: doc.data().createdAt.toDate(), // Uncaught TypeError: Cannot read properties of null (reading 'toDate')
          };
          chatRef.push({ ...chat });
        });
        chatRef.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        setChatLogs(chatRef);
        console.log(chatRef);
      });
    };
    fetchChatLog();
  }, [roomId]);

  // 時間
  const formatHHMM = (time: Date | string) => {
    return new Date(time).toTimeString().slice(0, 5);
  };

  return (
    <>
      <Container>
        <Heading>
          <Box>{user2Name}</Box>
          <Box fontSize={"16px"}>roomId: {roomId}</Box>
        </Heading>
        <Box minH={"500px"}>
          {chatLogs.map((item) => (
            <HStack
              key={item.msg}
              style={{
                marginLeft: user1Name === item.userName ? "3px" : "auto",
                justifyContent:
                  user1Name === item.userName ? "flex-end" : "flex-start",
              }}
            >
              {user1Name === item.userName ? (
                <>
                  <Text fontSize={"24px"} className="says">
                    {item.msg}
                  </Text>
                  <VStack>
                    <Avatar src={photoURL} />
                    <HStack>
                      {/* <Box fontSize={"20px"}>{item.userName}</Box> */}
                      <Box>
                        {item.userName === user1Name
                          ? formatHHMM(item.createdAt)
                          : ""}
                      </Box>
                    </HStack>
                  </VStack>
                </>
              ) : (
                <>
                  <VStack>
                    <Avatar src={user2PhotoURL} />
                    <HStack>
                      {/* <Box>{item.userName}</Box> */}
                      <Box>
                        {item.userName !== user1Name
                          ? formatHHMM(item.createdAt)
                          : ""}
                      </Box>
                    </HStack>
                  </VStack>
                  <Text fontSize={"24px"}>{item.msg}</Text>
                </>
              )}
            </HStack>
          ))}
        </Box>

        <Box>
          <form onSubmit={handleSendMessage}>
            <FormControl className="chatform">
              <Input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
              />
            </FormControl>
            <Button type="submit">送信</Button>
          </form>
        </Box>
      </Container>
    </>
  );
};
export default FriendChat;
