import { Box, Container, HStack, Stack } from "@chakra-ui/react";
import Link from "next/link";
import Footer from "../components/footer";

const Home = () => {
  return (
    <>
      <Container>
        <HStack justifyContent="spacebetween" bgColor="teal.200">
          <Link href="/components/profileCards">プロフィール</Link>
          <Link href="/posts/search">探す</Link>
          <Link href="/posts/friendsList">友達</Link>
          <Link href="/posts/chat">チャット</Link>
        </HStack>
        <Stack mb="20px">
          <Box>新着情報</Box>
          <Box h="300px" border="1px">
            アップデート、コラム
          </Box>
        </Stack>
        <Stack mb="20px">
          <Box>SNS</Box>
          <Box h="200px" border="1px"></Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default Home;