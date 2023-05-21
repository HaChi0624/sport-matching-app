// crud
import { FileInput } from "./FileInput";
import { Box, VStack } from "@chakra-ui/react";

const ProfileCards = () => {
  return (
    <VStack w="390px" h="500px" m="0 auto" border="1px">
      <Box
        w="200px"
        h="200px"
        borderRadius="50%"
        border="1px"
        objectFit="cover"
        overflow="hidden"
      >
        <FileInput />
      </Box>
      <Box>名前</Box>
      <Box>好きな球団</Box>
      <Box>好きな選手</Box>
    </VStack>
  );
};

export default ProfileCards;
