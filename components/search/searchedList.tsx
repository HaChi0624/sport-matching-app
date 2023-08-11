import { Card, SimpleGrid } from "@chakra-ui/react";

import ProfileCards from "@/components/profileCards";

type User = {
  uid: string;
  userName: string;
  photoURL: string;
};

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
          <Card key={user.uid}>
            <ProfileCards
              uid={user.uid}
              userName={user.userName}
              photoURL={user.photoURL}
            />
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default SearchedList;
