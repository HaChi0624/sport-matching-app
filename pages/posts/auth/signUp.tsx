import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
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

      <Box margin="0 auto" paddingTop="100">
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
            <Button type="submit">登録</Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
