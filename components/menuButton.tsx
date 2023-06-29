import { useAuthContext } from "@/firebase/auth/authProvider";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { signOut } from "@/firebase/authFunctions";

const MenuButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();
  return (
    <>
      <Button colorScheme="teal.900" onClick={onOpen}>
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
    </>
  );
};

export default MenuButton;
