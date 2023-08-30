import { Button, useDisclosure } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import UpdateModal from "./updateModal";

//プロフィール写真の更新
const NameUpdate = () => {
  const { user } = useAuth();
  const [userName, setUserName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProfile = () => {
    if (user) {
      updateDoc(doc(db, "users", user.uid), {
        userName: userName,
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
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        isOpen={isOpen}
        onClose={onClose}
        placeholder="名前"
      />
    </>
  );
};

export default NameUpdate;
