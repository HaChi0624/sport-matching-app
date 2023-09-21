import { Box } from "@chakra-ui/react";

import ChatForm from "@/components/chat/chatForm";
import ChatLogs from "@/components/chat/chatLogs";
import Header from "@/components/header/header";

const FriendChat = () => {

  return (
    <Box>
      <Header />
      <Box w="100%" h="60px" position="fixed" bg="whitesmoke" zIndex={20}></Box>
      <ChatLogs />
      <ChatForm />
    </Box>
  );
};
export default FriendChat;
