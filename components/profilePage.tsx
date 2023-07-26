import {
  Box,
  Text,
  Image,
  Center,
  HStack,
  Spacer,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import styles from "@/styles/myProfilePage.module.css";

import PhotoUpdate from "@/components/editProf/photoUpdate";
import NameUpdate from "./editProf/nameUpdate";
import FavTeamUpdate from "./editProf/favTeamUpdate";
import FavPlayersUpdate from "./editProf/favPlayersUpdate";
import CommentUpdate from "./editProf/commentUpdate";
import { useAuth } from "@/firebase/authFunctions";

const ProfilePage = (props: {
  photoURL: string;
  userName: string;
  favTeam: string;
  favPlayers: string;
  comment: string;
}) => {
  const { photoURL, userName, favTeam, favPlayers, comment } = props;
  const { user, status } = useAuth();

  return (
    <>
      {status === "LOADING" ? (
        "loading"
      ) : (
        <>
          {/* 写真 */}
          <Box>
            <Box>
              <Avatar
                src={photoURL}
                w="240px"
                h="240px"
                border="1px"
                borderRadius={"full"}
              />
              <PhotoUpdate />
            </Box>
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
              <Text>好きな選手</Text>
              <Box>{favPlayers}</Box>
            </Box>
            <Spacer />
            <FavPlayersUpdate />
          </HStack>
          {/* ひとこと */}
          <HStack>
            <Box>
              <Text>ひとこと</Text>
              <Box>{comment}</Box>
            </Box>
            <Spacer />
            <CommentUpdate />
          </HStack>
        </>
      )}
    </>
  );
};

export default ProfilePage;
