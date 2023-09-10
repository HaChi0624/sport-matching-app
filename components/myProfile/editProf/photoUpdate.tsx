import { Button, Icon } from "@chakra-ui/react";
import { SlCamera } from "react-icons/sl";

import usePhotoFile from "@/hooks/usePhotoFile";

//プロフィール写真の更新
const PhotoUpdate = () => {
  const { hiddenFileInput, handleFileClick, handleFileChange } = usePhotoFile();

  return (
    <>
      <div>
        <Button onClick={handleFileClick}>
          <Icon as={SlCamera} boxSize={"24px"} />
        </Button>
        <input
          hidden
          ref={hiddenFileInput}
          type="file"
          //multiple
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};

export default PhotoUpdate;
