import { ChangeEvent, useState } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import Link from "next/link";
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
      router.push("/posts/top");
    } catch (error) {
      alert("サインイン認証に失敗しました。authfunction.tsx");
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <Box width="40%" margin="0 auto" paddingTop="100">
      <Text fontSize="3xl" marginBottom="3">
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
          <Button type="submit">ログイン(ホーム画面へ)</Button>
        </Box>
      </form>
      <Box>
        <Link href="/posts/auth/signUp">ユーザ登録がお済み出ない方はこちらへ</Link>
      </Box>
    </Box>
  );
};
export default LogIn;

/*
ログイン機能はできた

ユーザ制限できていない
top画面などにユーザー情報が渡っていない
*/