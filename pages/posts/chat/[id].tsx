import { Box, Heading } from "@chakra-ui/react";
import styles from "@/styles/chatPage.module.css";

import { useChatPage } from "@/hooks/useChatPage";
import ChatForm from "@/components/chat/chatForm";
import ChatLogs from "@/components/chat/chatLogs";
import Header from "@/components/header";

const FriendChat = () => {
  const { user2Name } = useChatPage();

  return (
    <>
      <Header />
      <Box w="100%" h="60px" position="fixed" bg="whitesmoke" zIndex={20}></Box>
      {/* <Heading textAlign={"center"} zIndex={20}>
        {user2Name}
      </Heading>  */}

      {/* <Box fontSize={"16px"}>roomId: {roomId}</Box> */}
      <ChatLogs />
      <ChatForm />
    </>
  );
};
export default FriendChat;
