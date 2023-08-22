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
  const [inputName, setInputName] = useState("");
  const [inputFavTeam, setInputFavTeam] = useState("");
  // const [inputFavPlayer, setInputFavPlayer] = useState("");

  // searchUsersの初期値を設定
  useEffect(() => {
    setSearchUsers(users);
    // console.log(`searchUsers: ${searchUsers}`);
  }, [users]);

  // 検索欄への入力値をハンドリング
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
    searchName(e.target.value);
  };

  const handleInputFavteamChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInputFavTeam(e.target.value);
    searchFavteam(e.target.value);
  };

 

  // 検索
  const searchName = (value: string) => {
    const serchedUsers = users.filter(
      (user) => user.userName.toUpperCase().indexOf(value.toUpperCase()) > -1
    );
    setSearchUsers(serchedUsers);
  };

  const searchFavteam = (value: string) => {
    if (value === "未選択") {
      setSearchUsers(users);
    } else {
      const serchedUsers = users.filter((user) => value === user.favTeam);
      setSearchUsers(serchedUsers);
    }
    // console.log(serchedUsers)
  };

  return {
    //検索結果
    searchUsers,

    // 入力値
    inputFavTeam,
    inputName,
    // inputFavPlayer,

    // onChangeの値
    handleInputChange,
    // handleInputFavPlayerChange,
    handleInputFavteamChange,
  };
};
