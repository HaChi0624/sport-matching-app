import { Button, Icon, useDisclosure } from "@chakra-ui/react";
import { SlCamera } from "react-icons/sl";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import UpdateModal from "./updateModal";

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
      <Button onClick={onOpen}>
        <Icon as={SlCamera} boxSize={"24px"} />
      </Button>

      <UpdateModal
        handleUpdateProfile={handleUpdateProfile}
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        isOpen={isOpen}
        onClose={onClose}
        placeholder="写真のURL"
      />
    </>
  );
};

export default PhotoUpdate;
