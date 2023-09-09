import { Button, Input, useDisclosure } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import UpdateModal from "./updateModal";

//プロフィール写真の更新
const CommentUpdate = () => {
  const { user } = useAuth();

  const [comment, setComment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // エラー処理、バリデーション

  const handleUpdateProfile = () => {
    if (user) {
      updateDoc(doc(db, "users", user.uid), {
        comment: comment,
      });
    }
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>
        <ChevronRightIcon />
      </Button>

      <UpdateModal
        handleUpdateProfile={handleUpdateProfile}
        isOpen={isOpen}
        onClose={onClose}
      >
        <Input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={"コメント"}
            top="50px"
          />
      </UpdateModal>
    </>
  );
};

export default CommentUpdate;
