import { useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUsers";

type User = {
    uid: string;
    userName: string;
    photoURL: string;
  };

export const useSearchPage = () => {
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

  return { searchUsers, inputValue, handleInputChange };
};
