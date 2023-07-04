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
  const mainbgcolor = "rgb(0, 75, 149)";
  return (
    <Box bg={mainbgcolor}>
      <Center
        w="100%"
        h={["300px", "300px", "300px", "400px"]}
        bg={"white"}
        overflow={"hidden"}
      >
        <img
          src={IMG_1014.src}
          width="100%"
          height="300px"
          object-fit="cover"
        />
      </Center>
      <Container maxW={["90%", "90%", "80%", "60%"]} bg={"white"}>
        <Stack mt="8px" mb="20px">
          <Text fontSize="24px">―新着情報</Text>
          <Box
            h="300px"
            border="1px"
            borderRadius={"10px"}
            white-space="nowrap"
            overflow="scroll"
            overflowX="hidden"
            overflowY="scroll"
          >
            アップデート、コラムとか
          </Box>
        </Stack>
        <Stack mb="20px">
          <Box fontSize="24px">―このサイトの使い方</Box>
          <Box>―https://zenn.dev/yuki_tu/articles/f6f8568bede8e2</Box>
          <Button mr="1" w={"300px"}>
            チュートリアル
          </Button>
        </Stack>
        <Stack mb="20px">
          <Text fontSize="24px">―プロフィールを作ってみよう！</Text>
          {/* <CreateProfModal /> */}
          <Button
            onClick={() => router.push("/posts/myProfilePage")}
            w={"300px"}
          >
            作ってみよう！
          </Button>
        </Stack>
        <Stack mb="20px">
          <Text fontSize="24px">―SNS</Text>
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
    </Box>
  );
};

export default Top;
