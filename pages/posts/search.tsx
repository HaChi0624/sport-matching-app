import { Container, Heading, Input, InputGroup } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import DetailedSearch from "@/components/search/detailedSearch";
import SearchedList from "@/components/search/searchedList";

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

  // 検索欄への入力値をハンドリング
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    search(e.target.value);
  };

  // 名前検索
  const search = (value: string) => {
    // if (value === "") {
    //   setSearchUsers(users);
    //   return;
    // }
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

        {/* 名前検索 */}
        <InputGroup size="md">
          <Input
            placeholder="検索"
            value={inputValue}
            onChange={handleInputChange}
          />
        </InputGroup>

        {/* 詳細検索 */}
        <DetailedSearch />

        {/* 一覧 */}
        <SearchedList searchUsers={searchUsers} />
      </Container>
    </>
  );
};

export default myProfilePage;
