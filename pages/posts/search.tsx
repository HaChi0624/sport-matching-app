import {
  Container,
  Heading,
  Input,
  InputGroup,
} from "@chakra-ui/react";

import DetailedSearch from "@/components/search/detailedSearch";
import SearchedList from "@/components/search/searchedList";
import { useSearchPage } from "@/hooks/useSearchPage";


const myProfilePage = () => {
  const { searchUsers, inputValue, handleInputChange } = useSearchPage();

  return (
    <>
      <Container py="16px" maxW={["90%", "90%", "80%", "70%"]}>
        <Heading fontWeight={"light"} pb="16px">
          相手を探す
        </Heading>

        {/* 名前検索 */}
        <InputGroup size="md">
          <Input
            placeholder="検索"
            value={inputValue}
            onChange={handleInputChange}
          />
        </InputGroup>

        {/* 詳細検索 */}
        <DetailedSearch />

        {/* 一覧 */}
        <SearchedList searchUsers={searchUsers} />
      </Container>
    </>
  );
};

export default myProfilePage;
