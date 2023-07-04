import {
  Box,
  Text,
  Image,
  Center,
  HStack,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { ChevronRightIcon, EditIcon } from "@chakra-ui/icons";
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
      {/* 写真 */}
      <Box className={styles.box}>
        <Box>
          <Center>
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
              <Image
                src={goya.src}
                alt="picture"
                w="240px"
                h="240px"
                border="1px"
                borderRadius={"full"}
              />
            )}
          </Center>
          <EditIcon ml="320px" boxSize={"24px"} />
        </Box>
        <UserProfileUpdate />
        {/* <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <EditProfModal />
        </Box> */}
      </Box>
      {/* 名前 */}
      <HStack className={styles.box}>
        <Box>
          <Text className={styles.text}>名前</Text>
          <Box>{userName}</Box>
        </Box>
        <Spacer />
        <Button>
          <ChevronRightIcon />
        </Button>
      </HStack>
      {/* 好きな球団 */}
      <HStack className={styles.box}>
        <Box>
          <Text className={styles.text}>好きな球団</Text>
          <Box>{favTeam}</Box>
        </Box>
        <Spacer />
        <Button>
          <ChevronRightIcon />
        </Button>
      </HStack>
      {/* 好きな選手※5人まで */}
      <HStack className={styles.box}>
        <Box>
          <Text className={styles.text}>好きな選手※5人まで</Text>
          <Box>{favPlayers}</Box>
        </Box>
        <Spacer />
        <Button>
          <ChevronRightIcon />
        </Button>
      </HStack>
      {/* ひとこと */}
      <HStack className={styles.box}>
        <Box>
          <Text className={styles.text}>ひとこと</Text>
          <Box>{comment}</Box>
        </Box>
        <Spacer />
        <Button>
          <ChevronRightIcon />
        </Button>
      </HStack>
    </>
  );
};

export default ProfilePage;
