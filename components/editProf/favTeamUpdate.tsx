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
import { ChevronRightIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { auth, db } from "@/firebase/firebase";
import { useAuth } from "@/firebase/authFunctions";

//プロフィール写真の更新
const FavTeamUpdate = () => {
  const currentUser = useAuth();
  const [favTeam, setFavTeam] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProfile = () => {
    const user = auth.currentUser;
    if (user) {
      updateDoc(doc(db, "users", currentUser.uid), {
        favTeam: favTeam,
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
          <ModalHeader>好きな球団</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <input
                type="text"
                value={favTeam}
                onChange={(e) => setFavTeam(e.target.value)}
                placeholder="好きな球団"
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

export default FavTeamUpdate;
