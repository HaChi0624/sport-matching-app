import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Input,
  Spacer,
  Stack,
  VStack,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import React from "react";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack bgColor="teal.100">
      <Link href="/">Sport Matching App</Link>
      <Spacer />
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
              <Link href="/posts/">ログアウト</Link>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Header;
