import { Box, Container, Text } from "@chakra-ui/react";
import styles from '@/styles/myProfilePage.module.css'

const myProfilePage = () => {
  return (
    <Container>
      <Text className={styles.title} py={3}>My Profile</Text>
      <Box className={styles.box1}>
        <Box>画像挿入</Box>
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
        <Box>侍ジャパンから野球に興味を持ちました！まだまだ知らないことばかりですが、仲良くしてください！</Box>
      </Box>
    </Container>
  );
};

export default myProfilePage;
