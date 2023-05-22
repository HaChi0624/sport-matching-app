import Link from "next/link";
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
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack bgColor="teal.100">
      <Box>Sport Matching App</Box>
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
            {/* <Input placeholder='Type here...' /> */}
            <VStack>
              <Link href="/">ホーム</Link>
              <Link href="/components/profileCards">プロフィール</Link>
              <Link href="/components/">探す</Link>
              <Link href="/components/">友達</Link>
              <Link href="/components/">チャット</Link>
              <Link href="/components/">設定</Link>
              <Link href="/components/">ログアウト</Link>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Header;
