import { Container, HStack, Image, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import goya from "src/goya.png";
import { useUsers } from "@/hooks/useUsers";

const friendList = () => {
  const { users } = useUsers();
  // console.log(users);

  // likeのstateがtrueの場合に表示されるようにしたい
  return (
    <>
      <Container>
        <Text fontSize="4xl">友達一覧</Text>
        <Input placeholder="検索" />
        {users.map((user) => (
          <HStack h="20" key={user.uid}>
            {user.photoURL ? (
              <Image src={user.photoURL} alt="picture" w="64px" h="64px" />
            ) : (
              <Image src={goya.src} alt="picture" w="64px" h="64px" />
            )}
            <Text>
              <Link href={`/posts/friendProfilePage/${user.uid}`}>
                {user.userName}
              </Link>
            </Text>
          </HStack>
        ))}
      </Container>
    </>
  );
};

export default friendList;
