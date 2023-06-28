import { useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { updateProfile } from "firebase/auth";
import { Button, HStack, Stack, VStack } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/firebase/authFunctions";

//プロフィール写真の更新
const PhotoUpdate = () => {
  const currentUser = useAuth();
  const [photoURL, setPhotoURL] = useState("");

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
    <HStack>
      <input
        type="text"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        placeholder="写真のURL"
      />
      <Button onClick={handleUpdateProfile}>更新</Button>
    </HStack>
  );
};

export default PhotoUpdate;
