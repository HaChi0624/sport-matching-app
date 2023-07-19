import { Box, HStack, Spacer, Link, Avatar } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import styles from "@/styles/header.module.css";
import { useAuthContext } from "@/firebase/auth/authProvider";
import { useRecoilValue } from "recoil";

import MenuButton from "./menuButton";
import { useProfileCards } from "@/hooks/useProfileCards";
import { userProfState } from "@/store/prof";
import { myUidState } from "@/store/myUid";

const Header = () => {
  // const { user } = useAuthContext();
  // const { photoURL } = useProfileCards();
  // const userProf = useRecoilValue(userProfState);
  const myUid = useRecoilValue(myUidState);

  // console.log(user);
  console.log(`myUid is ${myUid}`);

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
        {/* <Box color="white">{user ? <Avatar src={userProf.photoURL} /> : "ゲスト"}</Box> */}
        <BellIcon color="white" boxSize={"32px"} />
        <MenuButton />
      </HStack>
    </HStack>
  );
};

export default Header;
