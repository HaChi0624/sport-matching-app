import { chakra, Box, Stack, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <chakra.footer bgColor="gray.100" w={'100%'} position={'fixed'} bottom={'0'}>
      <Container p='10px'>
        <Box>サイトマップ</Box>
        <Box>リンク</Box>
        <Box>お問い合わせ</Box>
        <Box>ご利用に際して</Box>
        <Box>©2023</Box>
      </Container>
    </chakra.footer>
  );
};

export default Footer;
