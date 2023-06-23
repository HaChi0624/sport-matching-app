import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useRecoilState } from "recoil";
  import { FieldValue, doc, serverTimestamp, setDoc } from "firebase/firestore";
  
  // import { createProfile } from '@/hooks/useProfileCards'
  import { db } from "@/firebase/firebase";
  import { useAuth } from "@/firebase/authFunctions";
  
  interface Prof {
    favTeam: string;
    favPlayers: string;
    comment: string;
    createdAt: FieldValue;
  }
  
  const CreateProfModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const currentUser = useAuth();
  
    const [favTeam, setFavTeam] = useState("");
    const [favPlayers, setFavPlayers] = useState("");
    const [comment, setComment] = useState("");
  
    // 初回作成時のみ使いたい
    const createProfile = async (e: any) => {
      e.preventDefault();
      const newProf = {
        favTeam: favTeam,
        favPlayers: favPlayers,
        comment: comment,
        createdAt: serverTimestamp(),
      };
      await setDoc(doc(db, "users", currentUser.uid), newProf);
      setFavTeam("");
      setFavPlayers("");
      setComment("");
      onClose();
    };
  
    console.log(currentUser.uid);
   
  
    return (
      <>
        <Button onClick={onOpen} mr="1" bgColor={"rgb(225, 218, 218)"}>
          追加
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>追加</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={createProfile}>
              <ModalBody>
                <FormControl>
                  <FormLabel>好きな球団</FormLabel>
                  <Input
                    value={favTeam}
                    onChange={(e) => setFavTeam(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>好きな選手</FormLabel>
                  <Input
                    value={favPlayers}
                    onChange={(e) => setFavPlayers(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>ひとこと</FormLabel>
                  <Input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
  
              <ModalFooter>
                <Button type="submit" mr={3}>
                  保存
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default CreateProfModal;