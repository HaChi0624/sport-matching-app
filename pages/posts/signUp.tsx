import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

const SignUp = () => {
  return (
    <>
      {/* <Header /> */}
      <Box width="40%" margin="0 auto" paddingTop="100">
        <Text fontSize="3xl" marginBottom="3">
          ユーザ登録
        </Text>
        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <FormControl>
            <FormLabel>メールアドレス</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="email"
              //   onChange={handleChangeEmail}
            />
          </FormControl>
          <FormControl>
            <FormLabel>パスワード</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              //   onChange={handleChangePassword}
            />
          </FormControl>
          <Box marginTop="3">
            <Button onClick={() => alert("登録されました")}>登録</Button>
          </Box>
        </form>
        {/* <Button onClick={() => router.push("/")}>todoリストへ</Button> */}
      </Box>
      <Link href="/">top</Link>
    </>
  );
};

export default SignUp;
