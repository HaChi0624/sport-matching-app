import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseError } from "firebase/app";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";

type ChatLog = {
  key: string;
  userName: string;
  uid: string;
  msg: string;
  createdAt: Date;
};

export const useChatPage = () => {
  const router = useRouter();
  const { user, status } = useAuth();
  const { userName, photoURL } = useProfile(); //user1のデータ

  const user1Id: string = user.uid;
  const user2Id: string = router.query.id as string;
  const user1Name = userName;
  const [roomId, setRoomId] = useState("");
  const [user2Name, setUser2Name] = useState("");
  const [user2PhotoURL, setUser2PhotoURL] = useState("");
  const [inputMsg, setInputMsg] = useState("");
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);

  //  get user2name and photoURL
  useEffect(() => {
    const fetchUser2Name = async () => {
      if (user2Id) {
        const userSnapshot = await getDoc(doc(db, "users", user2Id));
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUser2Name(userData.userName);
          setUser2PhotoURL(userData.photoURL);
        }
      }
    };
    fetchUser2Name();
  }, [user2Id]);

  // roomId
  useEffect(() => {
    const fetchRoomId = async () => {
      if (status === "LOADING") {
        return;
      }
      if (!user1Id) return;
      const collectionRef = collection(db, "users", user1Id, "friends");
      const querySnapshot = await getDocs(
        query(collectionRef, where("uid", "==", user2Id))
      );
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          setRoomId(doc.data().roomId);
        } else {
          console.log("Document does not exist.");
        }
      });
      // console.log(`roomId: ${roomId}`);
    };
    fetchRoomId();
  }, [status, user1Id, user2Id]);

  // チャット追加
  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "chat", roomId, "chatLog"), {
        key: Math.random(),
        uid: user1Id,
        userName: user1Name,
        msg: inputMsg,
        createdAt: serverTimestamp(),
      });
      setInputMsg("");
      // console.log(`id: ${docRef.id}`);
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };

  // チャット取得
  useEffect(() => {
    const fetchChatLog = async () => {
      if (!roomId) {
        return;
      }
      if (status === "LOADING") {
        return;
      }
      onSnapshot(collection(db, "chat", roomId, "chatLog"), (snapshot) => {
        const chatRef: ChatLog[] = [];
        snapshot.docs.map((doc) => {
          if (doc.exists()) {
            const chat = {
              key: doc.data().key,
              uid: doc.data().uid,
              userName: doc.data().userName,
              msg: doc.data().msg,
              createdAt: doc.data().createdAt
                ? doc.data().createdAt.toDate()
                : "",
            };
            chatRef.push({ ...chat });
          } else {
            console.log("Document does not exist.");
          }
        });
        chatRef.sort((a, b) => {
          // console.log("a.createdAt:", a.createdAt.getTime());
          // console.log("b.createdAt:", b.createdAt);
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
        setChatLogs(chatRef);
        console.log(chatRef);
      });
    };
    fetchChatLog();
  }, [roomId, status]);

  // 時間
  const formatHHMM = (time: Date | string) => {
    return new Date(time).toTimeString().slice(0, 5);
  };

  const formatMD = (time: Date | string) => {
    return new Date(time).getMonth() + "/" + new Date(time).getDate();
  };

  return {
    user1Name,
    user2Name,
    user2Id,
    photoURL,
    user2PhotoURL,
    chatLogs,
    handleSendMessage,
    inputMsg,
    setInputMsg,
    formatMD,
    formatHHMM,
  };
};
