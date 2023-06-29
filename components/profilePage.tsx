import { Box, Text, Image, Center } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import goya from "src/goya.png";
import EditProfModal from "@/components/editProf/editProf";
import UserProfileUpdate from "@/components/editProf/photoUpdate";

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
      <Box className={styles.box1}>
        <Center>
          {photoURL ? (
            <Image src={photoURL} alt="picture" w="240px" h="240px" />
          ) : (
            <Image src={goya.src} alt="picture" w="240px" h="240px" />
          )}
        </Center>
        <UserProfileUpdate />
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <EditProfModal />
        </Box>
        <Text className={styles.text}>名前</Text>
        <Box>{userName}</Box>
      </Box>

      <Box className={styles.box2}>
        <Text className={styles.text}>好きな球団</Text>
        <Box>{favTeam}</Box>
      </Box>
      <Box className={styles.box1}>
        <Text className={styles.text}>好きな選手※5人まで</Text>
        <Box>{favPlayers}</Box>
      </Box>
      <Box className={styles.box2}>
        <Text className={styles.text}>ひとこと</Text>
        <Box>{comment}</Box>
      </Box>
    </>
  );
};

export default ProfilePage;
