import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useAuth } from "@/firebase/authFunctions";
import { useUsers } from "@/hooks/useUsers";

const LikeButton = (props: { user2Id: string; user2Name: string }) => {
  const currentUser = useAuth();
  const { user2Id, user2Name } = props;
  const [like, setLike] = useState(false);

  // user2への通知処理を追加したい
  // setlikeだけupdateDocで変えられるように
  // roomidをuuidで生成したい
  const onClickLike = async () => {
    setLike(!like);
    const docRef = collection(db, "users", currentUser.uid, "friends");
    const querySnapshot = await getDocs(
      query(docRef, where("uid", "==", user2Id))
    );
    if (querySnapshot.empty) {
      addDoc(docRef, {
        uid: user2Id,
        userName: user2Name,
        like: true,
        roomId: "roomId",
      });
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
