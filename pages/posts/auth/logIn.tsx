import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  AbsoluteCenter,
  Divider,
} from "@chakra-ui/react";

import SnsIcon from "@/components/snsIcon";
import { useAuthFunction } from "@/hooks/authFunctions";
import SignupButton from "@/components/header/signupButton";

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
      <Box  margin="0 auto" paddingTop={["80px"]}>
        <Text fontSize="3xl" marginBottom="32px"></Text>
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
          <FormControl mt="3">
            <FormLabel>パスワード</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChangePassword}
            />
          </FormControl>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Box mt="3">
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

        {/* 新規登録 */}
        <Box mt='16px'>
          <SignupButton />
        </Box>
      </Box>
    </>
  );
};
export default LogIn;
