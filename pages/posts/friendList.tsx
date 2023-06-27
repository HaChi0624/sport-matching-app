import { Box, Container, HStack, Image, Input, Text } from "@chakra-ui/react";
import goya from "src/goya.png";
import favicon from "src/favicon.ico";
import { useUsers } from "@/hooks/useUsers";
import Link from "next/link";

const friendList = () => {
  const { users } = useUsers();
  // console.log(users)
  return (
    <>
      <Container>
        <Text fontSize="4xl">友達一覧</Text>
        <p>どんなリストにするか</p>
        <p>このページの役割</p>
        <p>usernameのみ取得</p>
        <Input placeholder="検索" />
        {users.map((user) => (
          <HStack h="20" key={user.id}>
            <Image src={goya.src} alt="picture" w="64px" h="64px" />
            <Text>
              <Link href={`/posts/friendProfilePage/${user.id}`}>{user.userName}</Link>
            </Text>
          </HStack>
        ))}
      </Container>
    </>
  );
};

export default friendList;
