import {
  Box,
  Container,
  HStack,
  Image,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import goya from "src/goya.png";
import { useUsers } from "@/hooks/useUsers";

const friendList = () => {
  const { users } = useUsers();
  // console.log(users);

  // likeのstateがtrueの場合に表示されるようにしたい
  return (
    <>
      <Container py="16px" maxW={["90%", "90%", "80%", "70%"]}>
        <Text fontSize="4xl">友達一覧</Text>
        <Input placeholder="検索" />
        <Box mt='8px'>
          {users.map((user) => (
            <HStack h="20" key={user.uid}>
              {user.photoURL ? (
                <Image src={user.photoURL} alt="picture" w="64px" h="64px" />
              ) : (
                <Image src={goya.src} alt="picture" w="64px" h="64px" />
              )}
              <Box>
                <Link href={`/posts/friendProfilePage/${user.uid}`}>
                  {user.userName}
                </Link>
                <Text>最新ログイン：２日前</Text>
              </Box>
              <Link href={`/posts/chat/${user.uid}`}>チャット</Link>
            </HStack>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default friendList;
