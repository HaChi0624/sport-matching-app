import { HStack, Spacer, Link, Avatar, Box, Flex } from "@chakra-ui/react";

import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import MenuButton from "./menuButton";
import Notification from "./notification";

const Header = () => {
  const { status } = useAuth();
  const { photoURL } = useProfile();

  return (
    <Box position={"fixed"} w="100%" h="60px" top='0' zIndex={100}>
      <Flex
        bg={"whitesmoke"}
      >
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
          <Link href="/posts/myProfilePage">
            {status !== "LOADING" ? <Avatar src={photoURL} /> : "Loading..."}
          </Link>
          {/* 通知 */}
          <Notification />
          {/* メニュー */}
          <MenuButton />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
