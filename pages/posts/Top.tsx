import CreateProfModal from "@/components/createProfModal";
import Footer from "@/components/footer";
import SnsIcon from "@/components/snsIcon";
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
      <Box
        w="100%"
        h={["300px", "300px", "300px", "400px"]}
        bg={"linear-gradient(pink,white,aqua)"}
      >
        見に行きたくなるような写真
      </Box>
      <Container maxW={["90%", "90%", "80%", "70%"]}>
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
            <SnsIcon bg="blue.400">Facebook</SnsIcon>
            <SnsIcon bg="blue.300">twitter</SnsIcon>
            <SnsIcon bg="red.500">Youtube</SnsIcon>
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
