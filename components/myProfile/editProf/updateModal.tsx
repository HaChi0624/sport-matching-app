import {
  Button,
  HStack,
  Input,
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
  value: string;
  onChange: (e: any) => void;
  placeholder: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { handleUpdateProfile, value, onChange, placeholder, isOpen, onClose } =
    props;

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
          <Input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            top="50px"
          />
        </ModalBody>

        <ModalFooter>
          <Button type="submit" onClick={handleUpdateProfile} w='100%'>
            更新
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
