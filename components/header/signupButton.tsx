import SignUp from "@/pages/posts/auth/signUp";
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
  
  
  const SignupButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Button onClick={onOpen} bg="none">
          新規登録はこちらへ
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>新規登録</DrawerHeader>
  
            <DrawerBody>
              <SignUp />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
  
  export default SignupButton;