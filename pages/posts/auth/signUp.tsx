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
import { signUp } from "@/firebase/authFunctions";

const SignUp = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await createUserWithEmailAndPassword(auth, email, password);
    await signUp(userName,email, password);
    router.push("/pages/posts/Top");
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
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
          <Box marginTop="3">
            <Button type="submit">登録(ホーム画面へ)</Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
