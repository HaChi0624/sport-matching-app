import { useState } from "react";
import { Button } from "@chakra-ui/react";
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


const LikeButton = (props: { user2Id: string; user2Name: string }) => {
  const {user} = useAuth();
  const { user2Id, user2Name } = props;
  const [like, setLike] = useState(false);

  // user2への通知処理を追加したい
  // setlikeだけupdateDocで変えられるように
  // 友達解除は別で
  const onClickLike = async () => {
    setLike(!like);
    const docRef = collection(db, "users", user.uid, "friends");
    const querySnapshot = await getDocs(
      query(docRef, where("uid", "==", user2Id))
    );
    if (querySnapshot.empty) {
      const newDocRef = doc(docRef);
      await setDoc(newDocRef, {
        uid: user2Id,
        userName: user2Name,
        like: true,
      });
      const newDocId = newDocRef.id;
      await updateDoc(newDocRef, { roomId: newDocId });
    }
  };

  return (
    <>
      <Button onClick={onClickLike} bg={like ? "red.200" : "white"}>
        👍
      </Button>
    </>
  );
};

export default LikeButton;
