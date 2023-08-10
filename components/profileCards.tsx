import {
  Box,
  Text,
  Image,
  Center,
  HStack,
  Spacer,
  Card,
  CardBody,
  Divider,
  Heading,
  CardFooter,
  Avatar,
  VStack,
} from "@chakra-ui/react";
// import styles from "@/styles/myProfilePage.module.css";
import ballIcon from "src/ballIcon.png";
import RequestButton from "./friendRequest/requestButton";

const ProfileCard = (props: {
  uid: string;
  userName: string;
  photoURL: string;
}) => {
  const { photoURL, uid, userName } = props;
  const request = "2";

  return (
    <>
      {/* img */}
      <CardBody m={"0 auto"}>
        <Avatar src={photoURL} w="240px" h="240px" />
      </CardBody>
      <Divider width="80%" m="0 auto" />

      {/* name & button */}
      <CardFooter>
        <VStack m={"0 auto"}>
          <HStack
            // mt="6" spacing="3"
            m={"0 auto"}
          >
            <Heading size="md">名前</Heading>
            <Text fontSize="3xl">{userName}</Text>
          </HStack>
          <RequestButton user2Id={uid} user2Name={userName} />
        </VStack>
      </CardFooter>
    </>
  );
};

export default ProfileCard;
