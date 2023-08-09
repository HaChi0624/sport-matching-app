import { ChangeEvent, useState } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";

import router from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/posts/Top");
    } catch (error) {
      alert("サインイン認証に失敗しました。authfunction.tsx");
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <>
      {/* <HStack
        // bg={["yellow.500"]}
        h="60px"
      >
        <Link
          href="/posts/Top"
          // color="white"
          fontWeight="bold"
          ml={["8px", "8px", "16px", "24px"]}
          fontSize={["20px", "24px", "24px", "24px"]}
        >
          Sport Matching App
        </Link>
      </HStack> */}
      <Box width="55%" margin="0 auto" paddingTop="160px">
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
          <Box marginTop="3">
            <Button type="submit">ログイン</Button>
          </Box>
        </form>
        <Box mt='32px'>
          <Link href="/posts/auth/signUp">
            ユーザ登録がお済みでない方はこちらへ
          </Link>
        </Box>
      </Box>
    </>
  );
};
export default LogIn;

/*
ログイン機能はできた

ユーザ制限できていない
top画面などにユーザー情報が渡っていない
*/
