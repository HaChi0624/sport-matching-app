import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

type User = {
  favTeam: any;
  uid: string;
  userName: string;
  photoURL: string;
};

// 使用箇所：相手を探す、友達一覧
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userSnapshot = await getDocs(collection(db, "users"));
        if (userSnapshot) {
          const newUsers: User[] = [];
          userSnapshot.forEach((doc) => {
            const user = {
              uid: doc.id,
              userName: doc.data().userName,
              photoURL: doc.data().photoURL,
              favTeam: doc.data().favTeam,
            };
            if (!newUsers.some((u) => u.uid === user.uid)) {
              newUsers.push(user);
            }
            // console.log(doc.data());
          });
          setUsers(newUsers);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchUsers();
  }, []);
  return { users };//uid,userName,photoURLが入っている
};
