import { Box, HStack, Spacer, Link, Avatar } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import styles from "@/styles/header.module.css";
import { useAuthContext } from "@/firebase/auth/authProvider";
import { useRecoilState, useRecoilValue } from "recoil";

import MenuButton from "./menuButton";
import { useProfile } from "@/hooks/useProfile";
import { userProfState } from "@/store/prof";
import { useEffect } from "react";
import { useAuth } from "@/firebase/authFunctions";

const Header = () => {
  // const { user } = useAuthContext();
  // const { photoURL } = useProfileCards();
  // const userProf = useRecoilValue(userProfState);
  // const [myUid, setMyUid] = useRecoilState(myUidState);

  // useEffect(() => {
  //   if (user) {
  //     setMyUid(user.uid)
  //     console.log(`myUid is ${myUid}`);
  //   }
  // })

  // console.log(user);

  const { user, status } = useAuth();

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
          {status !== "LOADING" ? <Avatar src={user.photoURL} /> : "ゲスト"}
        </Box>
        <BellIcon color="white" boxSize={"32px"} />
        <MenuButton />
      </HStack>
    </HStack>
  );
};

export default Header;
