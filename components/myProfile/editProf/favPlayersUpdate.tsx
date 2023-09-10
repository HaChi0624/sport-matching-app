import { Button, Input, useDisclosure } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import UpdateModal from "./updateModal";

//プロフィール写真の更新
const FavPlayersUpdate = () => {
  const { user } = useAuth();
  const [favPlayers, setFavPlayers] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // エラー処理、バリデーション
  const handleUpdateProfile = () => {
    if (user) {
      updateDoc(doc(db, "users", user.uid), {
        favPlayers: favPlayers,
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
            value={favPlayers}
            onChange={(e) => setFavPlayers(e.target.value)}
            placeholder={"好きな選手"}
            top="50px"
          />
      </UpdateModal>
    </>
  );
};

export default FavPlayersUpdate;
