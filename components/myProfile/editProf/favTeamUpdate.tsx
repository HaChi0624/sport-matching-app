import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";

//プロフィール写真の更新
const FavTeamUpdate = () => {
  const { user } = useAuth();
  const [favTeam, setFavTeam] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProfile = () => {
    if (user) {
      updateDoc(doc(db, "users", user.uid), {
        favTeam: favTeam,
      });
    }
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>
        <ChevronRightIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>好きな球団</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Select
                value={favTeam}
                onChange={(e) => setFavTeam(e.target.value)}
              >
                <option value="未選択">未選択</option>
                <option value="ヤクルト">ヤクルト</option>
                <option value="Dena">Dena</option>
                <option value="阪神">阪神</option>
                <option value="巨人">巨人</option>
                <option value="広島">広島</option>
                <option value="中日">中日</option>
                <option value="オリックス">オリックス</option>
                <option value="ソフトバンク">ソフトバンク</option>
                <option value="西武">西武</option>
                <option value="楽天">楽天</option>
                <option value="ロッテ">ロッテ</option>
                <option value="日本ハム">日本ハム</option>
                <option value="その他">その他</option>
              </Select>
            </VStack>
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
