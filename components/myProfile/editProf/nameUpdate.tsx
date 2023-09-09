import { Button, Input, useDisclosure } from "@chakra-ui/react";
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
        isOpen={isOpen}
        onClose={onClose}
      >
        <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={"名前"}
            top="50px"
          />
      </UpdateModal>
    </>
  );
};

export default NameUpdate;
