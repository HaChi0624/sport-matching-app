import { Box, Text, Image, Center } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import ballIcon from "src/ballIcon.png";

const ProfileCard = (props: { photoURL: string; userName: string }) => {
  const { photoURL, userName } = props;

  return (
    <>
      <Box className={styles.box1}>
        <Center>
          {photoURL ? (
            <Image src={photoURL} alt="picture" w="240px" h="240px" />
          ) : (
            <Image src={ballIcon.src} alt="picture" w="240px" h="240px" />
          )}
        </Center>

        <Text className={styles.text}>名前</Text>
        <Box>{userName}</Box>
      </Box>
    </>
  );
};

export default ProfileCard;
