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
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { signOut, useAuth } from "@/firebase/authFunctions";

const MenuButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  const navigationLinks = [
    { href: "/posts/Top", text: "ホーム" },
    { href: "/posts/myProfilePage", text: "プロフィール" },
    { href: "/posts/search", text: "探す" },
    { href: "/posts/friendList", text: "友達" },
    { href: "/posts/columns", text: "コラム" },
    { href: "/posts/settings", text: "設定" },
  ];

  return (
    <>
      <Button onClick={onOpen} bg="none">
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>メニュー</DrawerHeader>

          <DrawerBody>
            <Stack>
              {navigationLinks.map((item, index) => (
                <Box key={index} textAlign={'center'}>
                  <Link href={item.href}>{item.text}</Link>
                  <Divider pt='4px' />
                </Box>
              ))}
              <Button onClick={signOut}>ログアウト</Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuButton;
