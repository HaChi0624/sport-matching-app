import { chakra, Box, Stack, Container } from "@chakra-ui/react";

const Footer = () => {
  return (
    <chakra.footer bgColor="gray.100">
      <Container></Container>
      <Container>
        <Box>会社概要</Box>
        <Box>お問い合わせ</Box>
      </Container>
    </chakra.footer>
  );
};

export default Footer;
