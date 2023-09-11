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
} from "@chakra-ui/react";
import Link from "next/link";

const Notification = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar bg="gray.400" icon={<BellIcon bg="gray.400" boxSize={9} />}>
          <AvatarBadge boxSize="1.05em" bg="red.500" />
        </Avatar>
      </PopoverTrigger>

      <PopoverContent bg="whiteSmoke">
        <PopoverHeader fontWeight="semibold">通知</PopoverHeader>
        <PopoverArrow bg="red.100" />
        <PopoverCloseButton />
        <PopoverBody>
          <VStack>
            <Link href="/posts/searchProfilePage/{id}">
              ???さんから友達申請されました。
            </Link>
            <Divider />
            <Link href="/posts/searchProfilePage/{id}">
              ???さんから友達申請されました。
            </Link>
            <Divider />
            <Link href="/posts/searchProfilePage/{id}">
              ???さんから友達申請されました。
            </Link>
            <Divider />
            <Link href="/posts/searchProfilePage/{id}">
              ???さんから友達申請されました。
            </Link>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
