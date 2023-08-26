import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  Textarea,
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
  Timestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";

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
  const [dateMessage, setDateMessage] = useState("");

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
        if (doc.exists()) {
          setRoomId(doc.data().roomId);
        } else {
          console.log("Document does not exist.");
        }
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
          if (doc.exists()) {
            const chat = {
              key: doc.data().key,
              uid: doc.data().uid,
              userName: doc.data().userName,
              msg: doc.data().msg,
              createdAt: doc.data().createdAt
                ? doc.data().createdAt.toDate()
                : "",
            };
            chatRef.push({ ...chat });
          } else {
            console.log("Document does not exist.");
          }
        });
        chatRef.sort((a, b) => {
          // console.log("a.createdAt:", a.createdAt.getTime());
          // console.log("b.createdAt:", b.createdAt);
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
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

  const formatMD = (time: Date | string) => {
    return new Date(time).getMonth() + "/" + new Date(time).getDate();
  };

  return (
    <>
      <Heading w="80%" position={"fixed"} top="60px">
        {user2Name}
        {/* <Box fontSize={"16px"}>roomId: {roomId}</Box> */}
      </Heading>

      <Box
        w="80%"
        m="0 auto"
        mb="100px"
        // overflowY={"scroll"}
        zIndex={10}
      >
        {chatLogs.map((item) => (
          <HStack
            key={item.key}
            style={{
              marginLeft: user1Name === item.userName ? "3px" : "auto",
              justifyContent:
                user1Name === item.userName ? "flex-end" : "flex-start",
            }}
          >
            <>
              <Text fontSize={"24px"}>
                {user1Name === item.userName ? item.msg : ""}
              </Text>
              <VStack>
                <Link href={`/posts/friendProfilePage/${user2Id}`}>
                  <Avatar
                    src={user1Name === item.userName ? photoURL : user2PhotoURL}
                  />
                </Link>
                <HStack>
                  <Box>{formatMD(item.createdAt)}</Box>
                  <Box>{formatHHMM(item.createdAt)}</Box>
                </HStack>
              </VStack>
              <Text fontSize={"24px"}>
                {user1Name === item.userName ? "" : item.msg}
              </Text>
            </>
          </HStack>
        ))}
      </Box>

      <Box
        bg="gray.200"
        position={"fixed"}
        bottom={"0"}
        // height="100px"
        w="100%"
      >
        <form onSubmit={handleSendMessage}>
          <HStack pt="30px" w="80%" m="0 auto">
            <FormControl className="chatform">
              <Input
                type="text"
                value={inputMsg}
                placeholder="メッセージ"
                onChange={(e) => setInputMsg(e.target.value)}
                bg="whiteAlpha.900"
              />
            </FormControl>
            <Button type="submit">送信</Button>
          </HStack>
        </form>
      </Box>
    </>
  );
};
export default FriendChat;
