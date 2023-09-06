import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useAuthFunction } from "@/hooks/authFunctions";

const SignUp = () => {
  const {
    handleSubmit,
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    error,
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
      <Box width="40%" margin="0 auto" paddingTop="100">
        <Text fontSize="3xl" marginBottom="3">
          ユーザ登録
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>名前</FormLabel>
            <Input
              name="name"
              type="name"
              placeholder="name"
              onChange={handleChangeName}
            />
          </FormControl>
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
          <Box marginTop="3">
            <Button type="submit">登録(ホーム画面へ)</Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
