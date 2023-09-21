import { useChatPage } from "@/hooks/useChatPage";
import { Box, Button, FormControl, HStack, Input } from "@chakra-ui/react";


const ChatForm = () => {
  const { handleSendMessage, inputMsg, setInputMsg } = useChatPage();
  return (
    <Box
      bg="gray.200"
      position={"fixed"}
      bottom={"0"}
      w="100%"
      zIndex={20}
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
  );
};

export default ChatForm;
