import { db } from "@/firebase/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

type User = {
  id: string;
  userName: string;
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      const newUsers: User[] = [];
      snapshot.docs.map((doc) => {
        const user = {
          id: doc.data().uid,
          userName: doc.data().userName,
        };
        newUsers.push({ ...user });
      });
      setUsers(newUsers);
    });
  }, []);
  return { users };
};
