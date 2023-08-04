import Footer from "@/components/footer";
import SnsIcon from "@/components/snsIcon";
import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import IMG_1014 from "@/src/IMG_1014.png";
import { useRouter } from "next/router";
import Slider from "@/components/slider";

const Top = () => {
  const router = useRouter();
  const mainbgcolor = "rgb(0, 75, 149)";
  const items = [
    { id: 1, content: "Slide 1" },
    { id: 2, content: "Slide 2" },
    { id: 3, content: "Slide 3" },
  ];
  return (
    <Box>
      <Box textAlign={'center'}>
        <Text fontSize={"42px"} pl="-32px">
          いっしょに野球
        </Text>
        <Text fontSize={"42px"} pl="24px">
          見に行きませんか？
        </Text>
      </Box>
      <Stack>
        <Link href="/posts/myProfilePage">プロフィール</Link>
        <Link href="/posts/search">探す</Link>
        <Link href="/posts/friendsList">友達</Link>
      </Stack>
    </Box>
  );
};

export default Top;
