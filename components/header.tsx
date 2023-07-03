import { Box, HStack, Spacer, Link } from "@chakra-ui/react";
import styles from "@/styles/header.module.css";
import { useAuthContext } from "@/firebase/auth/authProvider";
import MenuButton from "./menuButton";

const Header = () => {
  const { user } = useAuthContext();

  console.log(user);

  return (
    // 'rgb(0, 75, 149)'
    <HStack bg={["red.200", "yellow.500", "green.200", 'rgb(0, 75, 149)']} h='96px'>
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
        <Box color="white">{user ? "ログイン中" : "ゲスト"}</Box>
        <MenuButton />
      </HStack>
    </HStack>
  );
};

export default Header;
