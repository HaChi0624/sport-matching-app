import { Container, Heading, Input, Stack } from "@chakra-ui/react";
import { useUsers } from "@/hooks/useUsers";
import ProfileCards from "@/components/profileCards";

const myProfilePage = () => {
  const { users } = useUsers();
  return (
    <>
      <Container py="16px" maxW={["90%", "90%", "80%", "70%"]}>
        <Heading fontWeight={"light"} pb="16px">
          相手を探す
        </Heading>

        <Input placeholder="検索" />
        <p>
          野球名鑑みたいに見せたい。そのために他のページをもう少しカッコよくしてギャップを生みたい。
        </p>

        {users.map((user) => (
          <>
            <Stack h="400px" w="360px" mt="16px" key={user.uid}>
              {/* <Box>
                {user.photoURL ? (
                  <Image src={user.photoURL} alt="picture" w="64px" h="64px" />
                ) : (
                  <Image src={ballIcon.src} alt="picture" w="64px" h="64px" />
                )}
              </Box>
              <Text>
                <Link href={`/posts/friendProfilePage/${user.uid}`}>
                  {user.userName}
                </Link>
              </Text> */}
              <ProfileCards userName={user.userName} photoURL={user.photoURL} />
            </Stack>
          </>
        ))}
      </Container>
    </>
  );
};

export default myProfilePage;
