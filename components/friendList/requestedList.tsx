import { Avatar, Box, HStack, Link, Text, Tooltip } from "@chakra-ui/react";
import { useRequestedList } from "@/hooks/useRequestedList";

const RequestedList = () => {
  const { requestList } = useRequestedList();

  return (
    <Box border={"1px"} borderRadius={"20px"} p="10px 20px" mb="20px">
      <Text fontSize={"24px"}>グッドされました！</Text>
      <Text>
        リンク先で友達になるを押すと友達一覧に表示されるようになります。
      </Text>
      <HStack h="20">
        {requestList.map((requester) => (
          <Link
            key={requester.uid}
            href={`/posts/friendProfilePage/${requester.uid}`}
          >
            <Tooltip label={requester.userName}>
              <Avatar src={requester.photoURL} w="64px" h="64px" />
            </Tooltip>
          </Link>
        ))}
      </HStack>
    </Box>
  );
};

export default RequestedList;
