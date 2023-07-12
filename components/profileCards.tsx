import { Box, Text, Image, Center, HStack, Spacer } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import ballIcon from "src/ballIcon.png";
import LikeButton from "./likeButton";

const ProfileCard = (props: {
  uid: string;
  userName: string;
  photoURL: string;
}) => {
  const { photoURL, uid, userName } = props;

  return (
    <>
      <Box className={styles.box} mt="16px">
        <Center>
          {photoURL ? (
            <Image src={photoURL} alt="picture" w="240px" h="240px" />
          ) : (
            <Image src={ballIcon.src} alt="picture" w="240px" h="240px" />
          )}
        </Center>

        <HStack>
          <Text className={styles.text}>名前</Text>
          <Box>{userName}</Box>
          <Spacer />
          <LikeButton user2Id={uid} user2Name={userName} />
        </HStack>
      </Box>
    </>
  );
};

export default ProfileCard;
