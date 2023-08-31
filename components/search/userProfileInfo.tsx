import { Box, HStack, Text, Divider } from "@chakra-ui/react";

const UserProfileInfo = (props: { label: any; value: string }) => {
  const { label, value } = props;
  return (
    <Box p="4px">
      <HStack>
        <Box>
          <Text>{label}</Text>
          <Text fontWeight="bold">{value}</Text>
        </Box>
      </HStack>
      <Divider p="4px" />
    </Box>
  );
};

export default UserProfileInfo;
