import { Box } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  bg: string;
  children: ReactNode;
};

const SnsIcon: FC<Props> = ({ bg, children }) => {
  return (
    <Box
      h="72px"
      w="72px"
      border="1px"
      borderRadius="full"
      bg={bg}
      color="white"
      fontSize={"16px"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  );
};
export default SnsIcon;
