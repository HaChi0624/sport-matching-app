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
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { auth, db } from "@/firebase/firebase";
import { useAuth } from "@/firebase/authFunctions";

//プロフィール写真の更新
const NameUpdate = () => {
  const currentUser = useAuth();
  const [userName, setUserName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProfile = () => {
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        displayName: userName,
      })
        .then(() => {
          updateDoc(doc(db, "users", currentUser.uid), {
            userName: userName,
          });
          console.log("プロフィールが更新されました");
        })
        .catch((error) => {
          console.error("プロフィールの更新に失敗しました", error);
        });
    }
    onClose()
  };

  return (
    <>
      <Button onClick={onOpen} ml="320px">
        <ChevronRightIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>名前の変更</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="名前"
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

export default NameUpdate;
