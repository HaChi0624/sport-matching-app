import { Box, Text, HStack, Spacer, Avatar, Divider } from "@chakra-ui/react";
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
  const { status } = useAuth();

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
          <Box>
            <Avatar
              src={photoURL}
              w={["340px", "340px", "440px", "540px"]}
              h={["340px", "340px", "440px", "540px"]}
            />
            <Spacer />
            <PhotoUpdate />
          </Box>

          {/* プロフィール情報 */}
          <Box className={styles.profileData}>
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
          </Box>
        </>
      )}
    </>
  );
};

export default ProfilePage;
