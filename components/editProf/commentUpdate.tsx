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

import { useState, useCallback } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/firebase";

import { useRecoilValue } from "recoil";
import { useAuth } from "@/firebase/authFunctions";

//プロフィール写真の更新
const CommentUpdate = () => {

  const {user} = useAuth();

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
      <Button onClick={onOpen} ml="320px">
        <ChevronRightIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="コメント"
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

export default CommentUpdate;