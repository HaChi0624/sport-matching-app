import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useUsers } from "@/hooks/useUsers";

import { db } from "@/firebase/firebase";
import { useAuth } from "./useAuth";
import { User } from "@/types/user";

export const useFriendList = () => {
  const { user, status } = useAuth();
  const { users } = useUsers();
  const [friendIdData, setFriendIdData] = useState<string[]>([]);
  const [friendList, setFriendList] = useState<User[]>([]);
  const [searchedList, setSearchedList] = useState<User[]>(friendList);
  const [inputValue, setInputValue] = useState("");

  // friends = trueを取得
  useEffect(() => {
    const fetchIdData = async () => {
      if (status === "LOADING") return;
      if (!user.uid) return;
      try {
        const collectionRef = collection(db, "users", user.uid, "friends");
        if (collectionRef) {
          const querySnapshot = await getDocs(
            query(collectionRef, where("friendStatus", "==", "friend"))
          );
          const newIdData: string[] = [];
          querySnapshot.forEach((doc) => {
            newIdData.push(doc.data().uid);
          });
          setFriendIdData(newIdData);
        }
      } catch (error) {
        console.error("Error fetching friendList:", error);
      }
    };
    fetchIdData();
  }, [user.uid, status]);

  // friend取得
  useEffect(() => {
    if (status === "LOADING") {
      return;
    }
    const newFriendsData = users.filter((user) =>
      friendIdData.includes(user.uid)
    );
    setFriendList(newFriendsData);
    console.log(`friendIdData: ${friendIdData}`);
  }, [friendIdData, users, status]);

  // searchUsersの初期値を設定
  useEffect(() => {
    setSearchedList(friendList);
    // console.log(`searchUsers: ${searchUsers}`);
  }, [friendList]);

  // 検索欄への入力値をハンドリング
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    search(e.target.value);
  };

  const search = (value: string) => {
    const searchedFriends = friendList.filter(
      (user) => user.userName.toUpperCase().indexOf(value.toUpperCase()) > -1
    );
    setSearchedList(searchedFriends);
  };

  return { inputValue, handleInputChange, searchedList };
};
