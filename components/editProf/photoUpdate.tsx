import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SlCamera } from "react-icons/sl";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { useAuth } from "@/firebase/authFunctions";

//プロフィール写真の更新
const PhotoUpdate = () => {
  const { user } = useAuth();
  const [photoURL, setPhotoURL] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProfile = () => {
    if (user) {
      updateDoc(doc(db, "users", user.uid), {
        photoURL: photoURL,
      });
    }
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} ml="320px">
        <Icon as={SlCamera} boxSize={"24px"} />
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
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="写真のURL"
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

export default PhotoUpdate;
