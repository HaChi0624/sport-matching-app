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
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useUsers } from "@/hooks/useUsers";
import ProfileCards from "@/components/profileCards";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

const myProfilePage = () => {
  const { users } = useUsers();
  return (
    <>
      <Container py="16px" maxW={["90%", "90%", "80%", "70%"]}>
        <Heading fontWeight={"light"} pb="16px">
          相手を探す
        </Heading>

        <Input placeholder="検索" />
        <Accordion allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      詳細検索
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>好きな球団</Box>
                  <Box>好きな選手</Box>
                  <Box>タグ</Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>

        <SimpleGrid
          mt="24px"
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
