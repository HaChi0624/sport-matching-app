import { Box, Container, Text, Avatar, Spacer, Button } from "@chakra-ui/react";
import styles from "@/styles/myProfilePage.module.css";

import { useRouter } from "next/router";

import UserProfileInfo from "@/components/search/userProfileInfo";
import Header from "@/components/header/header";
import RequestButton from "@/components/friendRequest/requestButton";
import { useProfile } from "@/hooks/useProfile";

const SearchProfilePage = () => {
  const router = useRouter();
  // 型アサーションはいいの？
  const uid: string = router.query.id as string;

  const { userName, favTeam, favPlayers, comment, photoURL } = useProfile(uid);

  const profileData = [
    {
      label: "名前",
      value: userName,
    },
    {
      label: "好きな球団",
      value: favTeam,
    },
    {
      label: "好きな選手",
      value: favPlayers,
    },
    {
      label: "ひとこと",
      value: comment,
    },
  ];

  return (
    <>
      <Header />
      <Container pt="60px">
        <Text className={styles.title} py={3}>
          Profile
        </Text>

        <Box>
          <Avatar
            src={photoURL}
            w={["340px", "340px", "440px", "540px"]}
            h={["340px", "340px", "440px", "540px"]}
          />
          <Spacer />
        </Box>

        <Button onClick={() => router.push("/posts/searchPage")}>
          探すページに戻る
        </Button>
        <RequestButton user2Id={uid} user2Name={userName} />

        {/* プロフィール情報 */}
        <Box className={styles.profileData}>
          {profileData.map((item, index) => (
            <UserProfileInfo
              key={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default SearchProfilePage;
