import { useRequestedList } from "@/hooks/useRequestedList";
import { BellIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  Avatar,
  AvatarBadge,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  VStack,
  Divider,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";

const Notification = () => {
  const { requestList } = useRequestedList();
  // console.log(requestList);
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar bg="gray.400" icon={<BellIcon bg="gray.400" boxSize={9} />}>
          {requestList.length === 0 ? (
            <></>
          ) : (
            <AvatarBadge boxSize="1.05em" bg="red.500" />
          )}
        </Avatar>
      </PopoverTrigger>

      <PopoverContent bg="whiteSmoke" p={2}>
        <PopoverHeader fontWeight="semibold">
          通知({requestList.length}件)
        </PopoverHeader>
        <PopoverArrow bg="red.100" />
        <PopoverCloseButton />
        <PopoverBody>
          <VStack>
            {requestList.length === 0 ? (
              <>通知はありません</>
            ) : (
              <>
                {requestList.map((requester) => (
                  <Box key={requester.uid}>
                    <Link href={`/posts/searchProfilePage/${requester.uid}`}>
                      {requester.userName}さんから友達申請されました。
                    </Link>
                    <Divider />
                  </Box>
                ))}
              </>
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
