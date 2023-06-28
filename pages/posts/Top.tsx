import CreateProfModal from "@/components/createProfModal";
import Footer from "@/components/footer";
import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

const Top = () => {
  return (
    <>
      <Box h="300px" w="100%" bg={"linear-gradient(white, pink)"}>
        見に行きたくなるような写真
      </Box>
      <Container>
        <Stack mt="20px" mb="20px">
          <Box>―新着情報</Box>
          <Box h="300px" border="1px" borderRadius={"10px"}>
            アップデート、コラムとか
          </Box>
        </Stack>
        <Stack mb="20px">
          <Box>―このサイトの使い方</Box>
          <Button mr="1" w={"300px"}>
            チュートリアル
          </Button>
        </Stack>
        <Stack mb="20px">
          <Text>―プロフィールを作ってみよう！</Text>
          <Text>作成済み→自分のページ、そうでない場合は作成ページへ</Text>
          <CreateProfModal />
        </Stack>
        <Stack mb="20px">
          <Box>―SNS</Box>
          <HStack h="100px">
            <Box
              h="72px"
              w="72px"
              border="1px"
              borderRadius="full"
              bg="blue.400"
              color="white"
              fontSize={"16px"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              FaceBook
            </Box>
            <Box
              h="72px"
              w="72px"
              border="1px"
              borderRadius="full"
              bg="blue.300"
              color="white"
              fontSize={"16px"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              twitter
            </Box>
            <Box
              h="72px"
              w="72px"
              border="1px"
              borderRadius="full"
              bg="red.500"
              color="white"
              fontSize={"16px"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
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
      <Footer />
    </>
  );
};

export default Top;
