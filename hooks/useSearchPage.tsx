import { useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "./useAuth";
import { useFriendList } from "./useFriendList";
import { searchUser } from "@/types/searchUser";

export const useSearchPage = () => {
  const { user } = useAuth();
  const { users } = useUsers();
  const { searchedList } = useFriendList();
  const [searchUsers, setSearchUsers] = useState<searchUser[]>(users);
  const [inputName, setInputName] = useState("");
  const [inputFavTeam, setInputFavTeam] = useState("");
  // const [inputFavPlayer, setInputFavPlayer] = useState("");

  // searchUsersの初期値を設定(ホストユーザーと既にフレンドの人を除いて)
  // friendStatusの値を持っておきたい
  useEffect(() => {
    const others = users.filter((item) => item.uid !== user.uid);
    setSearchUsers(
      others.filter(
        (other) =>
          !searchedList.some((searchedUser) => searchedUser.uid === other.uid)
      )
    );
    // console.log(`searchUsers: ${searchUsers}`);
  }, [users, user.uid, searchedList]);

  // 検索欄への入力値をハンドリング
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
    searchName(e.target.value);
  };

  const handleInputFavTeamChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInputFavTeam(e.target.value);
    searchFavTeam(e.target.value);
  };

  // 検索
  const searchName = (value: string) => {
    const searchedUsers = users.filter(
      (user) => user.userName.toUpperCase().indexOf(value.toUpperCase()) > -1
    );
    setSearchUsers(searchedUsers);
  };

  const searchFavTeam = (value: string) => {
    if (value === "未選択") {
      setSearchUsers(users);
    } else {
      const searchedUsers = users.filter((user) => value === user.favTeam);
      setSearchUsers(searchedUsers);
    }
    // console.log(searchedUsers)
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
    handleInputFavTeamChange,
  };
};
