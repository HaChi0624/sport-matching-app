import { Box, Divider, HStack, Text } from "@chakra-ui/react";

const UserFriendProfileInfo = (props: { label: any; value: any }) => {
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

export default UserFriendProfileInfo;
