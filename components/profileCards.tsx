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
      <CardBody>
        {photoURL ? (
          <Image
            src={photoURL}
            alt="picture"
            w="240px"
            h="240px"
            borderRadius="lg"
          />
        ) : (
          <Image
            src={ballIcon.src}
            alt="picture"
            w="240px"
            h="240px"
            borderRadius="lg"
          />
        )}
      </CardBody>

      <CardFooter>
        <HStack mt="6" spacing="3">
          <Heading size="md">名前</Heading>
          <Text fontSize="3xl">{userName}</Text>
          {/* <Spacer /> */}

          <RequestButton user2Id={uid} user2Name={userName} />
        </HStack>
      </CardFooter>
    </>
  );
};

export default ProfileCard;
