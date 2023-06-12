import { Box, Container, HStack, Stack } from "@chakra-ui/react";
import Link from "next/link";

const Top = () => {
  return (
    <>
      <Container>
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
        <HStack justifyContent="spacebetween" bgColor="teal.200">
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
