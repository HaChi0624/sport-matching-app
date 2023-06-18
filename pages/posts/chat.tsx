import {
  Avatar,
  Box,
  Button,
  chakra,
  Container,
  Flex,
  Heading,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { db } from "@/firebase/firebase";
import { FirebaseError } from "@firebase/util";
import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, getDoc, onSnapshot } from "firebase/firestore";

const _message = "確認用メッセージです。";
const _messages = [...Array(10)].map((_, i) => _message.repeat(i + 1));

type MessageProps = {
  message: string;
};
const Message = ({ message }: MessageProps) => {
  return (
    <Flex alignItems={"start"}>
      <Avatar />
      <Box ml={2}>
        <Text bgColor={"gray.200"} rounded={"md"} px={2} py={1}>
          {message}
        </Text>
      </Box>
    </Flex>
  );
};

const chat = () => {
  //追加
  const [message, setMessage] = useState<string>("");
  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "chat"), {
        message: message,
      });
      setMessage("");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };

  // 取得
  const [chats, setChats] = useState<{ message: string }[]>([]);
  useEffect(() => {
    try {
      onSnapshot(collection(db, "chat"), (querySnapShot) => {
        const updatedChats: { message: string }[] = [];
        querySnapShot.forEach((doc) => {
          updatedChats.push({ message: doc.data().message });
        });
        setChats(updatedChats);
      });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e);
      }
      return;
    }
  }, []);

  return (
    <>
      <Container py={14}>
        <Heading>チャット</Heading>

        <Spacer height={4} aria-hidden />
        <Flex flexDirection={"column"} overflowY={"auto"} gap={2} height={400}>
          {/* {_messages.map((message, index) => (
            <Message message={message} key={`ChatMessage_${index}`} />
          ))} */}
          {chats.map((chat, index) => (
            <Message message={chat.message} key={`ChatMessage_${index}`} />
          ))}
        </Flex>
        <Spacer height={2} aria-hidden />
        <chakra.form display={"flex"} gap={2} onSubmit={handleSendMessage}>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button type={"submit"}>送信</Button>
        </chakra.form>
      </Container>
    </>
  );
};

export default chat;
