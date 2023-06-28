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
import { signOut } from "@/firebase/authFunctions";
import { useAuthContext } from "@/firebase/auth/authProvider";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext()

  console.log(user)

  return (
    <HStack bgColor={"rgb(0, 35, 149)"}>
      <Link href="/posts/top" color={'rgb(255, 255, 255)'} pl='2'>Sport Matching App</Link>
      <Spacer />
      {/* 機能してない */}
      {/* <Box>ようこそ {userName}さん！</Box> */}
      <Box color={'rgb(255, 255, 255)'}>{user ? 'ログイン中' : 'ログアウト中'}</Box>

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
              <Link href="/posts/Top">ホーム</Link>
              <Link href="/posts/myProfilePage">プロフィール</Link>
              <Link href="/posts/search">探す</Link>
              <Link href="/posts/friendList">友達</Link>
              <Link href="/posts/chat">チャット</Link>
              <Link href="/posts/columns">コラム</Link>
              <Link href="/posts/settings">設定</Link>
              <Box>
                {user ? (
                  <Button onClick={signOut}>ログアウト</Button>
                ) : (
                  <Link href="/posts/auth/logIn">ログイン</Link>
                )}
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Header;
