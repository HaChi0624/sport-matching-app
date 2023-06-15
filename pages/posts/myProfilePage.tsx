import { Box, Container, Text, Image, Center, Button } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import goya from "src/goya.png";

const myProfilePage = () => {
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
        <Box>m.t</Box>
      </Box>

      <Box className={styles.box2}>
        <Text className={styles.text}>好きな球団</Text>
        <Box>東映フライヤーズ</Box>
      </Box>
      <Box className={styles.box1}>
        <Text className={styles.text}>好きな選手※5人まで</Text>
        <Box>ブーマー、ブラゼル、ブランコ、ブキャナン、ブセニッツ</Box>
      </Box>
      <Box className={styles.box2}>
        <Text className={styles.text}>ひとこと</Text>
        <Box>
          侍ジャパンから野球に興味を持ちました！まだまだ知らないことばかりですが、仲良くしてください！
        </Box>
      </Box>
      <Button mr='0'>編集</Button>
    </Container>
  );
};

export default myProfilePage;
