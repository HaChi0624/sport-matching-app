import { useEffect, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import { FriendStatus } from "@/types/searchUser";

const RequestButton = (props: { user2Id: string; user2Name: string }) => {
  const toast = useToast();
  const { user, status } = useAuth();
  const user1Id = user.uid;
  const { user2Id, user2Name } = props;
  const [friendStatus, setFriendStatus] = useState<FriendStatus>(null);

  useEffect(() => {
    const fetchFriendStatus = async () => {
      if (status === "LOADING") return;
      if (!user1Id) return;
      try {
        const q = query(
          collection(db, "users", user1Id, "friends"),
          where("uid", "==", user2Id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setFriendStatus(doc.data().friendStatus);
        });
      } catch (error) {
        console.error("Error fetching friendStatus:", error);
      }
    };
    fetchFriendStatus();
  }, [status, user1Id, user2Id]);

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
      description: `${user2Name}さんへ友達申請しました！`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      {friendStatus === null && (
        <Button
          onClick={onClickRequest}
          bg="red.200"
          _hover={{ bg: "red.100" }}
        >
          友達申請
        </Button>
      )}
      {friendStatus === "request" && <Button bg="gray.200">申請済み</Button>}
      {friendStatus === "requested" && (
        <Button bg="gray.200">申請されています</Button>
      )}
    </>
  );
};

export default RequestButton;
