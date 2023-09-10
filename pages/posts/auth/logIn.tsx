import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Link,
  AbsoluteCenter,
  Divider,
  Checkbox,
} from "@chakra-ui/react";

import SnsIcon from "@/components/snsIcon";
import { useAuthFunction } from "@/hooks/authFunctions";

const LogIn = () => {
  const {
    handleLogin,
    handleChangeEmail,
    handleChangePassword,
    error,
    loginWithGoogle,
  } = useAuthFunction();

  return (
    <>
      <HStack
        bg="none"
        w="100%"
        h="60px"
        position={"fixed"}
        top="0"
        zIndex={100}
      >
        <Box
          fontWeight={"bold"}
          ml={["8px", "8px", "16px", "24px"]}
          fontSize={["20px", "24px", "24px", "24px"]}
        >
          supotch
        </Box>
      </HStack>

      <Box
        width="300px"
        margin="0 auto"
        paddingTop={["80px", "160px", "160px", "160px"]}
      >
        <Text fontSize="3xl" marginBottom="32px">
          ログインページ
        </Text>
        <form onSubmit={handleLogin}>
          <FormControl>
            <FormLabel>メールアドレス</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="email"
              onChange={handleChangeEmail}
            />
          </FormControl>
          <FormControl>
            <FormLabel>パスワード</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChangePassword}
            />
          </FormControl>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Checkbox>ログイン状態を保持する</Checkbox>
          <Box marginTop="3">
            <Button type="submit" m="0 auto">
              ログイン
            </Button>
          </Box>
        </form>

        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            or
          </AbsoluteCenter>
        </Box>

        <HStack>
          <Box onClick={loginWithGoogle}>
            <SnsIcon bg={"white"} color={"red"} fontSize="40px">
              G
            </SnsIcon>
          </Box>
          <SnsIcon bg={"black"} color={"white"} fontSize="40px">
            X
          </SnsIcon>
          <SnsIcon bg={"#3b5998"} color={"white"} fontSize="40px">
            f
          </SnsIcon>
        </HStack>

        <Box mt="32px">
          <Link href="/posts/auth/signUp">新規登録はこちらへ</Link>
        </Box>
      </Box>
    </>
  );
};
export default LogIn;
