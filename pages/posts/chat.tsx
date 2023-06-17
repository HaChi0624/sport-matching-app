import {
  Button,
  chakra,
  Container,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";

import { db } from "@/firebase/firebase";
import { FirebaseError } from "@firebase/util";
import { FormEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

const chat = () => {
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

  return (
    <>
      <Container py={14}>
        <Heading>チャット</Heading>
        <Spacer height={8} aria-hidden />
        <chakra.form display={"flex"} gap={2} onSubmit={handleSendMessage}>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button type={"submit"}>送信</Button>
        </chakra.form>
      </Container>
    </>
  );
};

export default chat;
