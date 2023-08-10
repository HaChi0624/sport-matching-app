import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Heading,
  Input,
  SimpleGrid,
  Box,
  Spacer,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  InputGroup,
  RadioGroup,
  Stack,
  Radio,
  Text,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import ProfileCards from "@/components/profileCards";

type User = {
  uid: string;
  userName: string;
  photoURL: string;
};

const myProfilePage = () => {
  const { users } = useUsers();

  const [searchUsers, setSearchUsers] = useState<User[]>(users);
  const [inputValue, setInputValue] = useState("");

  const [value, setValue] = useState("1");

  // searchUsersの初期値を設定
  useEffect(() => {
    setSearchUsers(users);
    // console.log(`searchUsers: ${searchUsers}`);
  }, [users]);

  // // 検索欄への入力値をハンドリング
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    search(e.target.value);
  };

  // 名前検索
  const search = (value: string) => {
    if (value === "") {
      setSearchUsers(users);
      return;
    }
    const serchedUsers = users.filter(
      (user) => user.userName.toUpperCase().indexOf(value.toUpperCase()) > -1
    );
    setSearchUsers(serchedUsers);
  };

  // console.log(users);

  return (
    <>
      <Container py="16px" maxW={["90%", "90%", "80%", "70%"]}>
        <Heading fontWeight={"light"} pb="16px">
          相手を探す
        </Heading>

        <InputGroup size="md">
          <Input
            placeholder="検索"
            value={inputValue}
            onChange={handleInputChange}
          />
        </InputGroup>

        <Accordion allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <Box>
                  <AccordionButton bg="gray.100">
                    <Box as="span" flex="1" textAlign="left">
                      詳細検索
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>
                </Box>
                <AccordionPanel pb={4}>
                  <Box fontSize={"20px"} pt={"6px"}>
                    好きな球団
                  </Box>
                  <RadioGroup onChange={setValue} value={value}>
                    <Stack direction="row">
                      <Radio value="1">ヤクルト</Radio>
                      <Radio value="2">Dena</Radio>
                      <Radio value="3">阪神</Radio>
                      <Radio value="4">巨人</Radio>
                      <Radio value="5">広島</Radio>
                      <Radio value="6">中日</Radio>
                    </Stack>
                    <Stack direction="row">
                      <Radio value="7">オリックス</Radio>
                      <Radio value="8">ソフトバンク</Radio>
                      <Radio value="9">西武</Radio>
                      <Radio value="10">楽天</Radio>
                      <Radio value="11">ロッテ</Radio>
                      <Radio value="12">日本ハム</Radio>
                    </Stack>
                    <Radio value="13">その他</Radio>
                  </RadioGroup>
                  <Box fontSize={"20px"} pt={"6px"}>
                    好きな選手
                  </Box>
                  <Input
                    placeholder="検索"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <Box fontSize={"20px"} pt={"6px"}>
                    タグ
                  </Box>
                  <Input
                    placeholder="検索"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>

        <SimpleGrid
          mt="24px"
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {searchUsers.map((user) => (
            <Card key={user.uid}>
              <ProfileCards
                uid={user.uid}
                userName={user.userName}
                photoURL={user.photoURL}
              />
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default myProfilePage;
