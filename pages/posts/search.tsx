import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Calendar from "./calendar";

const search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <Button onClick={onOpen}>日程から</Button>
        <p>カレンダーの表示→押すとその日の試合一覧表示→相手一覧or日程登録</p>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Calendar />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Box>
        <Button>好きな球団から</Button>
        <p>好きな球団を選択する→相手一覧</p>
      </Box>
    </>
  );
};

export default search;
