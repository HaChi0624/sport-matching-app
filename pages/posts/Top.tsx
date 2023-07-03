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
import IMG_1014 from "@/src/IMG_1014.png";
import { useRouter } from "next/router";

const Top = () => {
  const router = useRouter();
  return (
    <>
      <Center
        w="100%"
        h={["300px", "300px", "300px", "400px"]}
        bg={"white"}
        overflow={"hidden"}
      >
        <img src={IMG_1014.src} width="100%" height="300px" object-fit="cover" />
      </Center>
      <Container maxW={["90%", "90%", "80%", "60%"]}>
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
          {/* <CreateProfModal /> */}
          <Button onClick={() => router.push("/posts/myProfilePage")} w={"300px"}>
            作ってみよう！
          </Button>
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
