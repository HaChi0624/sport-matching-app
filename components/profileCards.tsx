// crud
import { FileInput } from "./FileInput";
import { Box, VStack } from "@chakra-ui/react";

const ProfileCards = () => {
  return (
    <VStack w="390px" h="600px" pt="20px" m="0 auto" border="1px">
      <Box
        w="300px"
        h="400px"
        border="1px"
        overflow="hidden"
      >
        <FileInput />
      </Box>
      <Box>名前</Box>
      <Box>好きな選手</Box>
      <Box>ひとこと</Box>
    </VStack>
  );
};

export default ProfileCards;
