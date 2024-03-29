import {
  Avatar,
  Box,
  Divider,
  HStack,
  Input,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import styles from "@/styles/friendList.module.css";

import { useFriendList } from "@/hooks/useFriendList";

const FriendList = () => {
  const { inputValue, handleInputChange, searchedList } = useFriendList();

  return (
    <Box>
      <Text fontSize="4xl">友達一覧</Text>
      <Input
        placeholder="検索"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Box mt="8px">
        {searchedList.length === 0 ? (
          <>
            <Box>
              <Text>現在フレンドはいません</Text>
            </Box>
          </>
        ) : (
          <>
            {searchedList.map((user) => (
              <Box key={user.uid}>
                <HStack h="20">
                  <Avatar src={user.photoURL} w="64px" h="64px" />
                  <Link
                    href={`/posts/friendProfilePage/${user.uid}`}
                    pl="16px"
                    fontSize={"18px"}
                    className={styles.name}
                  >
                    {user.userName}
                  </Link>
                  <Spacer />
                  <Text>最新ログイン：２日前</Text>
                  <Spacer />

                  <Link
                    href={`/posts/chat/${user.uid}`}
                    className={styles.icon}
                  >
                    <ChatIcon />
                  </Link>
                </HStack>
                <Divider />
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default FriendList;
