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
  const {user} = useAuth();
  const [userName, setUserName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProfile = () => {
    if (user) {
      updateDoc(doc(db, "users", user.uid), {
        userName: userName,
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
