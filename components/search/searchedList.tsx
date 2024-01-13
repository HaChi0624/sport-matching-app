import { Box, Card, SimpleGrid } from "@chakra-ui/react";

import ProfileCards from "@/components/search/profileCards";
import { User } from "@/types/user";

const SearchedList = (props: { searchUsers: User[] }) => {
  const { searchUsers } = props;

  return (
    <>
      <SimpleGrid
        mt="24px"
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {searchUsers.map((user: User) => (
          <>
            {user ? (
              <Card key={user.uid}>
                <ProfileCards
                  uid={user.uid}
                  userName={user.userName}
                  photoURL={user.photoURL}
                />
              </Card>
            ) : (
              <Box>該当するユーザーがいません。</Box>
            )}
          </>
        ))}
      </SimpleGrid>
    </>
  );
};

export default SearchedList;
