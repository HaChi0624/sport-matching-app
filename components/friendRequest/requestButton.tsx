import { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useAuth } from "@/firebase/authFunctions";

const RequestButton = (props: { user2Id: string; user2Name: string }) => {
  const toast = useToast();
  const { user } = useAuth();
  const user1Id = user.uid;
  const { user2Id, user2Name } = props;
  // const [roomId, setRoomId] = useState("");
  // const [request, setRequest] = useState(false);
  const [friendStatus, setFriendStatus] = useState<string | null>(null); //request,requested,friend,null

  // user2への通知処理を追加したい
  const onClickRequest = async () => {
    const user1CollectionRef = collection(db, "users", user1Id, "friends");
    const user2DocRef = doc(db, "users", user2Id, "friends", user1Id);
    const querySnapshot = await getDocs(
      query(user1CollectionRef, where("uid", "==", user2Id))
    );

    if (querySnapshot.empty) {
      // user1（申請する側）
      const user1DocRef = doc(user1CollectionRef);
      await setDoc(user1DocRef, {
        uid: user2Id,
        // request: true, //申請した
        friendStatus: "request",
      });
      const roomId = user1DocRef.id;
      await updateDoc(user1DocRef, { roomId: roomId });
      // setRoomId(newDocId);

      // user2（受け取る側）
      await setDoc(user2DocRef, {
        uid: user1Id,
        roomId: roomId,
        // requested: true, //申請された
        friendStatus: "requested",
      });
    }

    setFriendStatus("request");
    toast({
      title: "通知",
      description: "友達申請をしました！",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={onClickRequest} bg="gray.200">
        友達申請
      </Button>
    </>
  );
};

export default RequestButton;
