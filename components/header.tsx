import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Spacer,
  Stack,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { signOut, useAuth } from "@/firebase/authFunctions";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //追加
  const currentUser = useAuth();

  return (
    <HStack bgColor="teal.100">
      <Link href="/">Sport Matching App</Link>
      <Spacer />
      <Box>ようこそ {currentUser !== null ? "m.t" : "ゲスト"}さん！</Box>
      <Button colorScheme="teal" onClick={onOpen}>
        メニュー
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>メニュー</DrawerHeader>

          <DrawerBody>
            <Stack>
              <Link href="/">ホーム</Link>
              <Link href="/components/profileCards">プロフィール</Link>
              <Link href="/posts/search">探す</Link>
              <Link href="/posts/friendsList">友達</Link>
              <Link href="/posts/chat">チャット</Link>
              <Link href="/posts/columns">コラム</Link>
              <Link href="/posts/settings">設定</Link>
              {/* <Link href="/posts/">ログアウト</Link> */}
              <Box>{currentUser !== null ? (<Button onClick={signOut}>ログアウト</Button>) : (<Link href="/posts/auth/logIn">ログイン</Link>)}</Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Header;
