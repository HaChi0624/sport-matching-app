import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Box,
  Spacer,
} from "@chakra-ui/react";
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

        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {users.map((user) => (
            <Card key={user.uid}>
              <ProfileCards
                uid={user.uid}
                userName={user.userName}
                photoURL={user.photoURL}
              />
            </Card>
          ))}
        </SimpleGrid>
        
      </Container>
    </>
  );
};

export default myProfilePage;
