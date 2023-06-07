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

const search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box>
        <Button onClick={onOpen}>好きな球団から</Button>
        <p>好きな球団を選択する→相手一覧</p>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>パ・リーグ</p>
              <Button>オリックス</Button>
              <Button>ソフトバンク</Button>
              <Button>西武</Button>
              <Button>楽天</Button>
              <Button>ロッテ</Button>
              <Button>日本ハム</Button>
              <p>セ・リーグ</p>
              <Button>ヤクルト</Button>
              <Button>DeNA</Button>
              <Button>阪神</Button>
              <Button>巨人</Button>
              <Button>広島</Button>
              <Button>中日</Button>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default search;

//一括で検索+下に一覧表示

//検索方法を分ける
//好きな球団or 行きたい日程
//検索をするためには、先にユーザー情報を登録できるようにしたい