import {
  Box,
  Text,
  Image,
  Center,
  HStack,
  Spacer,
  Button,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import styles from "@/styles/myProfilePage.module.css";

import PhotoUpdate from "@/components/editProf/photoUpdate";
import NameUpdate from "../editProf/nameUpdate";
import FavTeamUpdate from "../editProf/favTeamUpdate";
import FavPlayersUpdate from "../editProf/favPlayersUpdate";
import CommentUpdate from "../editProf/commentUpdate";
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

  const profileData = [
    {
      label: "名前",
      value: userName,
      updateComponent: <NameUpdate />,
    },
    {
      label: "好きな球団",
      value: favTeam,
      updateComponent: <FavTeamUpdate />,
    },
    {
      label: "好きな選手",
      value: favPlayers,
      updateComponent: <FavPlayersUpdate />,
    },
    {
      label: "ひとこと",
      value: comment,
      updateComponent: <CommentUpdate />,
    },
  ];

  return (
    <>
      {status === "LOADING" ? (
        "loading"
      ) : (
        <>
          {/* 写真 */}
          <Box textAlign="center">
            <Avatar
              src={photoURL}
              w="240px"
              h="240px"
              border="1px"
              borderRadius={"full"}
            />
            <Spacer />
            <PhotoUpdate />
          </Box>

          {/* プロフィール情報 */}
          {profileData.map((item, index) => (
            <Box key={index} p="4px">
              <HStack>
                <Box>
                  <Text>{item.label}</Text>
                  <Text fontWeight={"bold"}>{item.value}</Text>
                </Box>
                <Spacer />
                {item.updateComponent}
              </HStack>
              <Divider p="4px" />
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default ProfilePage;
