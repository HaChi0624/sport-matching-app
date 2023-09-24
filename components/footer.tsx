import { chakra, Link, VStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <chakra.footer bgColor="gray.100" w={'100%'} mt='20px'>
      <VStack p='10px' display={'flex'}>
        <Link>サイトマップ</Link>
        <Link>お問い合わせ</Link>
        <Link>ご利用に際して</Link>
      </VStack>
    </chakra.footer>
  );
};

export default Footer;
