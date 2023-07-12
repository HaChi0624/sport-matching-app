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
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { auth, db } from "@/firebase/firebase";
import { useAuth } from "@/firebase/authFunctions";

//プロフィール写真の更新
const PhotoUpdate = () => {
  const currentUser = useAuth();
  const [photoURL, setPhotoURL] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProfile = () => {
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        photoURL: photoURL,
      })
        .then(() => {
          updateDoc(doc(db, "users", currentUser.uid), {
            photoURL: photoURL,
          });
          console.log("プロフィールが更新されました");
        })
        .catch((error) => {
          console.error("プロフィールの更新に失敗しました", error);
        });
    }
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
              <Button onClick={handleUpdateProfile}>更新</Button>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PhotoUpdate;
