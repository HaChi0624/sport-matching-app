import { FC } from "react";
import { useProfileCards } from "../../hooks/useProfileCards";
import { Box, Input } from "@chakra-ui/react";

export const FileInput: FC = () => {
  const { handleFiles, imageContainerRef } = useProfileCards();
  return (
    <>
      <Box >
        <Input type="file" accept="image/*" onChange={handleFiles} />
      </Box>
      <div ref={imageContainerRef} />
    </>
  );
};
