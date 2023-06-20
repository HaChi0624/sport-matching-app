import { Box, Container, Text, Image, Center, Button } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import goya from "src/goya.png";
import { useProfileCards } from "@/hooks/useProfileCards";

const FriendProfilePage = () => {
  const { userName, favTeam, favPlayers, comment } = useProfileCards();

  return (
    <Container>
      <Text className={styles.title} py={3}>
        Friend Profile
      </Text>
      <Box className={styles.box1}>
        <Center>
          <Image src={goya.src} alt="picture" w="240px" h="240px" />
        </Center>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button mr="1" bgColor={'rgb(225, 218, 218)'}>
            いいね
          </Button>
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
    </Container>
  );
};

export default FriendProfilePage;