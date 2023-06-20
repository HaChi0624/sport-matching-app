import {
  Box,
  Container,
  HStack,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import styles from "../styles/friendList.module.css";
import goya from "src/goya.png";
import favicon from "src/favicon.ico";

const friendList = () => {
  return (
    <>
      <Container>
        <Text fontSize="4xl">友達一覧</Text>
        <p>どんなリストにするか</p>
        <p>このページの役割</p>
        <p>名前を押すとリンク先に飛ぶ</p>
        <Input placeholder="検索" />
        <HStack h="20">
          <Image src={goya.src} alt="picture" w="64px" h="64px" />
          <Text>
            <Link href="/posts/friendProfilePage">m.t</Link>
          </Text>
        </HStack>
        <HStack h="20">
          <Image src={favicon.src} alt="picture" w="64px" h="64px" />
          <Text>J.F.K</Text>
        </HStack>
        <HStack h="20">
          <Image src={favicon.src} alt="picture" w="64px" h="64px" />
          <Text>B.K.B</Text>K.
        </HStack>
        <HStack h="20">
          <Image src={favicon.src} alt="picture" w="64px" h="64px" />
          <Text>U.S.J</Text>
        </HStack>
        <HStack h="20">
          <Image src={favicon.src} alt="picture" w="64px" h="64px" />
          <Text>E.T.C</Text>
        </HStack>
        <HStack h="20">
          <Image src={favicon.src} alt="picture" w="64px" h="64px" />
          <Text>K.F.C</Text>
        </HStack>
      </Container>
    </>
  );
};

export default friendList;
