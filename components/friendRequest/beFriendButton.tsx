import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useAuth } from "@/firebase/authFunctions";

const BeFriendButton = (props: { user2Id: string; user2Name: string }) => {
  const { user, status } = useAuth();
  const user1Id = user.uid;
  const { user2Id, user2Name } = props;
  const [request, setRequest] = useState(false);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const fetchRoomId = async () => {
      if (status === "LOADING") {
        return;
      }
      const collectionRef = collection(db, "users", user1Id, "friends");
      const querySnapshot = await getDocs(
        query(collectionRef, where("uid", "==", user2Id))
      );
      querySnapshot.forEach((doc) => {
        setRoomId(doc.id);
      });
    };
    fetchRoomId();
  }, [user2Id]);

  //user2から申請をうけた
  const onClickRequest = async () => {
    const user1CollectionRef = collection(db, "users", user1Id, "friends");
    const user2docRef = doc(db, "users", user2Id, "friends", user1Id);

    // roomIdの取得
    const roomId = getDoc(user2docRef);

    //user2の情報を追加
    // requestButtonに移動
    // const user1QuerySnapshot = await getDocs(
    //   query(user1CollectionRef, where("uid", "==", user2Id))
    // );
    // if (user1QuerySnapshot.empty) {
    //   const newUser1DocRef = doc(user1CollectionRef);
    //   await setDoc(newUser1DocRef, {
    //     uid: user2Id,
    //     roomId: roomId,
    //     request: false,
    //     friend: true,
    //   });
    // }

    // user1のrequest=falseに変更, friend=trueの追加
  };
  
  return (
    <>
      <Button onClick={onClickRequest}>友達になる</Button>
      <Button>やめておく</Button>
      <Button>保留</Button>
    </>
  );
};

export default BeFriendButton;
