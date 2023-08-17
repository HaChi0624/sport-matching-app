import { useEffect, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
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
  const toast = useToast();
  const { user, status } = useAuth();
  const user1Id = user.uid;
  const { user2Id, user2Name } = props;
  // const [request, setRequest] = useState(false);

  //user2から申請をうけた
  const onClickToBeFriend = async () => {
    if (status === "LOADING") {
      return;
    }

    const user1DocRef = doc(db, "users", user1Id, "friends", user2Id);
    const docSnap = await getDoc(user1DocRef);

    if (docSnap.exists()) {
      // user1のrequested falseにする
      const roomId = docSnap.data().roomId;
      await updateDoc(user1DocRef, {
        // requested: false,
        friendStatus: "friend",
      });
      // user2のrequest falseにする
      const user2DocRef = doc(db, "users", user2Id, "friends", roomId);
      await updateDoc(user2DocRef, {
        friendStatus: "friend",
      });
       // chatコレクションにroomIdに基づいたChatLogを作成
       await setDoc(doc(db, 'chat', roomId), {
        roomId: roomId,
        member: {user1Id, user2Id},
      })
    }
    toast({
      title: "通知",
      description: "友達になりました！",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={onClickToBeFriend}>友達になる!</Button>
    </>
  );
};

export default BeFriendButton;


