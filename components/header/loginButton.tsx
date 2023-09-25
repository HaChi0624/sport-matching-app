import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import LogIn from "@/pages/posts/auth/logIn";

const LoginButton = (props: {
  buttonTitle: string;
  bg: string;
  className?: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { buttonTitle, bg, className } = props;

  return (
    <>
      <Button onClick={onOpen} bg={bg} className={className}>
        {buttonTitle}
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>ログイン</DrawerHeader>

          <DrawerBody>
            <LogIn />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LoginButton;
