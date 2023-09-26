import { useRef, useState } from "react";
import { db, storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

import { useAuth } from "./useAuth";

const usePhotoFile = () => {
  const [progress, setProgress] = useState<number>();
  const [avatarImage, setAvatarImage] = useState("");
  const { user } = useAuth();

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleFileClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files![0];
    uploadFile(file);
    return { handleFileChange };
  };

  const uploadFile = (file: any) => {
    if (!file) return;
    const storageRef = ref(storage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => alert(err.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setAvatarImage(url); //一度クライアントサイドでステート保持したらそれが表示されるようにしたい
          //Authユーザーのプロフィール更新（photoURLのみ）
          if (user) {
            updateDoc(doc(db, "users", user.uid), {
              photoURL: url,
            });
          }
        });
      }
    );
  };
  

  return {
    progress,
    avatarImage,
    setAvatarImage,
    hiddenFileInput,
    handleFileClick,
    handleFileChange,
    uploadFile,
  };
};

export default usePhotoFile;
