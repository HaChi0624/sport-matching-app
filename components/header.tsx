import { Box, HStack, Spacer, Link, Avatar } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import styles from "@/styles/header.module.css";

import MenuButton from "./Button/menuButton";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, status } = useAuth();
  const { photoURL } = useProfile();

  return (
    // 'rgb(0, 75, 149)'
    <>
      <HStack
        // bg={'whitesmoke'}
        bg="none"
        w="100%"
        h="60px"
        position={"fixed"}
        top="0"
        zIndex={100}
      >
        <Link
          href="/posts/Top"
          // color="white"
          fontWeight={"bold"}
          ml={["8px", "8px", "16px", "24px"]}
          fontSize={["20px", "24px", "24px", "24px"]}
        >
          supotch
        </Link>
        <Spacer />
        <HStack>
          <Link href="/posts/myProfilePage">
            {status !== "LOADING" ? <Avatar src={photoURL} /> : "Loading..."}
          </Link>
          <BellIcon
            // color="white"
            boxSize={"32px"}
          />
          <MenuButton />
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
