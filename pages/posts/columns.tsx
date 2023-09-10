import { Box, Center, Container, Heading, Text } from "@chakra-ui/react";

const columns = () => {
  return (
    <Container maxW={'80%'}>
      <Box  marginLeft={'16px'}>
        <Heading>コラム1: top画面について</Heading>
        <Text marginTop={'16px'} fontSize={'20px'}>
          マッチングアプリのトップ画面はどんなものにすべきでしょうか。
          そもそも何のマッチングをするのかにもよりますが、対象を求めてアプリを開いた方に最初に見せるものはとても大事だと思います。
          今回の野球観戦マッチングアプリでは「野球を見に行きたい！」と思わせられるような画面にしたいです。
          そのために必要なことはわくわくするような実感のこもった写真やキーワードがあると良いと思いました。
        </Text>
      </Box>
    </Container>
  );
};

export default columns;
