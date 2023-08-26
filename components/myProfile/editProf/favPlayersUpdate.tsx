import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";

//プロフィール写真の更新
const FavPlayersUpdate = () => {
  const {user} = useAuth();
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
      <Button onClick={onOpen} ml="320px">
        <ChevronRightIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>好きな選手</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <input
                type="text"
                value={favPlayers}
                onChange={(e) => setFavPlayers(e.target.value)}
                placeholder="好きな選手"
              />
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleUpdateProfile}>更新</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FavPlayersUpdate;