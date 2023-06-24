import CreateProfModal from "@/components/createProfModal";
import { Box, Button, Container, HStack, Stack } from "@chakra-ui/react";
import Link from "next/link";

const Top = () => {
  return (
    <>
      <Container>
        <Stack mt="20px" mb="20px">
          <Box>新着情報</Box>
          <Box h="300px" border="1px" borderRadius={"10px"}>
            アップデート、コラムとか
          </Box>
        </Stack>
        <Stack mb="20px">
          <Box>このサイトの使い方</Box>
          <Button mr="1" w={"300px"}>
            チュートリアル
          </Button>
        </Stack>
        <Stack mb="20px">
          <Box>プロフィールを作ってみよう！</Box>
          <CreateProfModal />
        </Stack>
        <Stack mb="20px">
          <Box>SNS</Box>
          <HStack h="100px">
            <Box h="72px" w="72px" border="1px" borderRadius="full">
              FaceBook
            </Box>
            <Box h="72px" w="72px" border="1px" borderRadius="full">
              twitter
            </Box>
            <Box h="72px" w="72px" border="1px" borderRadius="full">
              Youtube
            </Box>
          </HStack>
        </Stack>
        <HStack bgColor="gray.200" borderRadius="10px">
          <Link href="/posts/myProfilePage">プロフィール</Link>
          <Link href="/posts/search">探す</Link>
          <Link href="/posts/friendsList">友達</Link>
          <Link href="/posts/chat">チャット</Link>
        </HStack>
      </Container>
    </>
  );
};

export default Top;
