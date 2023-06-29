import {
  Box,
  Container,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import ballIcon from "src/ballIcon.png";
import { useUsers } from "@/hooks/useUsers";
import ProfileCards from "@/components/profileCards";

const myProfilePage = () => {
  const { users } = useUsers();
  return (
    <>
      <Container py="16px" w="90%">
        <Heading fontWeight={"light"} pb="16px">
          相手を探す
        </Heading>

        <Input placeholder="検索" />
        {users.map((user) => (
          <>
            <Stack h="20" key={user.uid}>
              <Box>
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
              </Text>
            </Stack>
            <ProfileCards userName={user.userName} photoURL={user.photoURL} />
          </>
        ))}
      </Container>
    </>
  );
};

export default myProfilePage;
