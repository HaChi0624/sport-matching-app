import {
  Text,
  HStack,
  CardBody,
  Divider,
  Heading,
  CardFooter,
  Avatar,
  VStack,
  Link,
} from "@chakra-ui/react";
import RequestButton from "../friendRequest/requestButton";

const ProfileCard = (props: {
  uid: string;
  userName: string;
  photoURL: string;
}) => {
  const { photoURL, uid, userName } = props;

  return (
    <>
      {/* img */}
      <CardBody m={"0 auto"}>
        <Link href={`/posts/friendProfilePage/${uid}`}>
          <Avatar src={photoURL} w="240px" h="240px" />
        </Link>
      </CardBody>
      <Divider width="80%" m="0 auto" />

      {/* name & button */}
      <CardFooter>
        <VStack m={"0 auto"}>
          <HStack m={"0 auto"}>
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
