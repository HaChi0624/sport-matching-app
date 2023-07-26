import { Container, Heading } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";
import { useProfile } from "@/hooks/useProfile";
import ProfilePage from "@/components/profilePage";

const myProfilePage = () => {
  const { userName, favTeam, favPlayers, comment, photoURL } =
    useProfile();

  // console.log("userName: " + userName);
  // console.log("favTeam: " + favTeam);

  return (
    <Container>
      <Heading className={styles.title} py={3}>
        My Profile
      </Heading>
      <ProfilePage
        photoURL={photoURL}
        userName={userName}
        favTeam={favTeam}
        favPlayers={favPlayers}
        comment={comment}
      />
    </Container>
  );
};

export default myProfilePage;
