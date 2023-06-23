import { Box, Container, Text, Image, Center, Button } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import goya from "src/goya.png";
import { useProfileCards } from "@/hooks/useProfileCards";
import EditProfModal from "@/components/editProfModal";

const myProfilePage = () => {
  const { userName, favTeam, favPlayers, comment } = useProfileCards();

  //readProfile
  
  console.log("userName: " + userName)
  console.log("favTeam: " + favTeam)

  return (
    <Container>
      <Text className={styles.title} py={3}>
        My Profile
      </Text>
      <Box className={styles.box1}>
        <Center>
          <Image src={goya.src} alt="picture" w="240px" h="240px" />
        </Center>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <EditProfModal />
          {/* <Button onClick={onOpenProfModal}>
            編集
          </Button> */}
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

export default myProfilePage;
