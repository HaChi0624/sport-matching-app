import { HStack, Spacer, Link, Avatar, Box, Flex } from "@chakra-ui/react";

import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import MenuButton from "./menuButton";
import Notification from "./notification";
import LoginButton from "./loginButton";

const Header = () => {
  const { status } = useAuth();
  const { photoURL } = useProfile();

  return (
    <Box position={"fixed"} w="100%" h="60px" top="0" zIndex={100}>
      <Flex bg={"whitesmoke"}>
        <Link
          href="/posts/Top"
          fontWeight={"bold"}
          ml={["8px", "8px", "16px", "24px"]}
          fontSize={["20px", "24px", "24px", "24px"]}
        >
          supotch
        </Link>
        <Spacer />
        <HStack>
          {/* マイプロフィール */}
          {status === 'NOT_LOGGED_IN' ? (
            <LoginButton buttonTitle="ログイン・新規登録" bg="none"/>
          ) : (
            <Link href="/posts/myProfilePage">
             {status !== 'LOADING' ? <Avatar src={photoURL} /> : 'loading...'}
            </Link>
          )}

          {/* 通知、メニュー */}
          {status !== 'LOGGED_IN' ? (
            <></>
          ) : (
            <>
              <Notification />
              <MenuButton />
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
