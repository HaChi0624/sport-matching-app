import { Box, HStack, Spacer, Link, Avatar } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import styles from "@/styles/header.module.css";
import { useAuthContext } from "@/firebase/auth/authProvider";
import { useRecoilState, useRecoilValue } from "recoil";

import MenuButton from "./Button/menuButton";
import { useProfile } from "@/hooks/useProfile";
import { userProfState } from "@/store/prof";
import { useEffect } from "react";
import { useAuth } from "@/firebase/authFunctions";

const Header = () => {
  const { user, status } = useAuth();
  const { photoURL } = useProfile();

  return (
    // 'rgb(0, 75, 149)'
    <HStack bg={["yellow.500"]} h="96px">
      <Link
        href="/posts/Top"
        color="white"
        fontWeight={"bold"}
        ml={["8px", "8px", "16px", "24px"]}
        fontSize={["20px", "24px", "24px", "24px"]}
      >
        Sport Matching App
      </Link>
      <Spacer />
      <HStack>
        <Box color="white">
          {status !== "LOADING" ? <Avatar src={photoURL} /> : "ゲスト"}
        </Box>
        <BellIcon color="white" boxSize={"32px"} />
        <MenuButton />
      </HStack>
    </HStack>
  );
};

export default Header;
