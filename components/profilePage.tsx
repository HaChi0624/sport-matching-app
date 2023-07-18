import {
  Box,
  Text,
  Image,
  Center,
  HStack,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import styles from "@/styles/myProfilePage.module.css";

import PhotoUpdate from "@/components/editProf/photoUpdate";
import NameUpdate from "./editProf/nameUpdate";
import FavTeamUpdate from "./editProf/favTeamUpdate";
import FavPlayersUpdate from "./editProf/favPlayersUpdate";
import CommentUpdate from "./editProf/commentUpdate";

const ProfilePage = (props: {
  photoURL: string;
  userName: string;
  favTeam: string;
  favPlayers: string;
  comment: string;
}) => {
  const { photoURL, userName, favTeam, favPlayers, comment } = props;

  return (
    <>
      {/* 写真 */}
      <Box>
        <Box>
          {photoURL ? (
            <Image
              src={photoURL}
              alt="picture"
              w="240px"
              h="240px"
              border="1px"
              borderRadius={"full"}
            />
          ) : (
            <Box w="240px" h="240px" border="1px" borderRadius={"full"} />
          )}

          <PhotoUpdate />
        </Box>
        {/* <UserProfileUpdate /> */}
        {/* <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <EditProfModal />
        </Box> */}
      </Box>
      {/* 名前 */}
      <HStack>
        <Box>
          <Text>名前</Text>
          <Box>{userName}</Box>
        </Box>
        <Spacer />
        <NameUpdate />
      </HStack>
      {/* 好きな球団 */}
      <HStack>
        <Box>
          <Text>好きな球団</Text>
          <Box>{favTeam}</Box>
        </Box>
        <Spacer />
        <FavTeamUpdate />
      </HStack>
      {/* 好きな選手※5人まで */}
      <HStack>
        <Box>
          <Text className={styles.text}>好きな選手</Text>
          <Box>{favPlayers}</Box>
        </Box>
        <Spacer />
        <FavPlayersUpdate />
      </HStack>
      {/* ひとこと */}
      <HStack>
        <Box>
          <Text className={styles.text}>ひとこと</Text>
          <Box>{comment}</Box>
        </Box>
        <Spacer />
        <CommentUpdate />
      </HStack>
    </>
  );
};

export default ProfilePage;
