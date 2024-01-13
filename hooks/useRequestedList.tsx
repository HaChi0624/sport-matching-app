import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useUsers } from "@/hooks/useUsers";
import { db } from "@/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";

export const useRequestedList = () => {
  const { user, status } = useAuth();
  const { users } = useUsers();
  const [requestedIdData, setRequestedIdData] = useState<string[]>([]);
  const [requestList, setRequestList] = useState<User[]>([]);

  //　requestされているidを取得
  useEffect(() => {
    const fetchIdData = async () => {
      if (status === "LOADING") return;
      if (!user.uid) return;
      try {
        const collectionRef = collection(db, "users", user.uid, "friends");
        if (collectionRef) {
          const querySnapshot = await getDocs(
            query(collectionRef, where("friendStatus", "==", "requested"))
          );
          const newIdData: string[] = [];
          querySnapshot.forEach((doc) => {
            newIdData.push(doc.data().uid);
          });
          setRequestedIdData(newIdData);
        }
      } catch (error) {
        console.error("Error fetching requestList:", error);
      }
    };
    fetchIdData();
  }, [user.uid, status]);

  // 友達申請されているIDと一致するユーザーリストを取得
  useEffect(() => {
    if (status === "LOADING") {
      return;
    }
    const newRequestData = users.filter((user) =>
      requestedIdData.includes(user.uid)
    );
    setRequestList(newRequestData);
    // console.log(`requestedIdData: ${requestedIdData}`)
  }, [requestedIdData, users, status]);
  return { requestList };
};
