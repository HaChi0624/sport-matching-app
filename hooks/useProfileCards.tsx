import { ChangeEventHandler, useRef, useState, useEffect } from "react";

let fileImage: HTMLImageElement | undefined;

export const useProfileCards = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [objectURL, setObjectURL] = useState("");

  //DOMの読み込みをしてからnew Image()の実行
  useEffect(() => {
    fileImage = new Image();
  }, []);

  const resetSelection = () => {
    if (fileImage) {
      fileImage.src = "";
      const imageContainer = imageContainerRef.current;
      if (imageContainer && fileImage.parentNode === imageContainer) {
        imageContainer.removeChild(fileImage);
      }
    }
    if (objectURL) {
      window.URL.revokeObjectURL(objectURL);
      setObjectURL("");
    }
  };

  const handleFiles: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.currentTarget.files;
    resetSelection();
    if (!files || files?.length === 0) return;
    const file = files[0];
    if (!file.type.includes("image/")) {
      event.currentTarget.value = "";
      return;
    }

    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;
    const objectURL = window.URL.createObjectURL(file);
    if (fileImage) {
      fileImage.src = objectURL;
      imageContainer.appendChild(fileImage);
      setObjectURL(objectURL);
    }
  };
  return { handleFiles, imageContainerRef };
};
