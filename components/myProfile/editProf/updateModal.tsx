import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const UpdateModal = (props: {
  handleUpdateProfile: () => void;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}) => {
  const {
    handleUpdateProfile,
    isOpen,
    onClose,
    children,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        top={["100px", "100px", "100px", "100px"]}
        height={["400px", "400px", "400px", "400px"]}
      >
        <ModalHeader>編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>

        <ModalFooter>
          <Button type="submit" onClick={handleUpdateProfile} w="100%">
            更新
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
