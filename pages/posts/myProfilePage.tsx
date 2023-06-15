import { Box, Container, Text, Image, Center, Button } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import goya from "src/goya.png";

const myProfilePage = () => {
  const userName = 'm.t'
  const favTeam = '東映フライヤーズ'
  const favPlayers = 'ブーマー、ブラゼル、ブランコ、ブキャナン、ブセニッツ'
  const comment = '侍ジャパンから野球に興味を持ちました！まだまだ知らないことばかりですが、仲良くしてください！'

  return (
    <Container>
      <Text className={styles.title} py={3}>
        My Profile
      </Text>
      <Box className={styles.box1}>
        <Center>
          <Image src={goya.src} alt="picture" w="240px" h="240px" />
        </Center>
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
        <Box>
          {comment}
        </Box>
      </Box>
      <Button mr='0'>編集</Button>
    </Container>
  );
};

export default myProfilePage;
