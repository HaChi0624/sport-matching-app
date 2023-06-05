import { FormEvent, useState } from "react";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import router from "next/router";
import Link from "next/link";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    router.push("/");
  };
  
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  return (
    <>
      <Box width="40%" margin="0 auto" paddingTop="100">
        <Text fontSize="3xl" marginBottom="3">
          ユーザ登録
        </Text>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit">登録(ホーム画面へ)</Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
