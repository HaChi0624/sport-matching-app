import { Container } from "@chakra-ui/react";
import RequestedList from "@/components/friendList/requestedList";
import FriendList from "@/components/friendList/friendList";
import Header from "@/components/header";

const FriendListPage = () => {
  return (
    <>
      <Header />
      <Container pt="60px" maxW={["90%", "90%", "80%", "600px"]}>
        {/* リクエスト受理待ちリスト */}
        <RequestedList />
        {/* フレンドリスト  */}
        <FriendList />
      </Container>
    </>
  );
};

export default FriendListPage;
