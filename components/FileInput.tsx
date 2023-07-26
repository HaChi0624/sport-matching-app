import { FC } from "react";
import { useProfile } from "../hooks/useProfile";
import { Box, Input } from "@chakra-ui/react";

export const FileInput: FC = () => {
  const { handleFiles, imageContainerRef } = useProfile();
  return (
    <>
      <Box>
        <Input type="file" accept="image/*" onChange={handleFiles} />
      </Box>
      <div ref={imageContainerRef} />
    </>
  );
};
