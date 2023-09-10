import {
  Box,
  Container,
  HStack,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";

import DetailedSearch from "@/components/search/detailedSearch";
import SearchedList from "@/components/search/searchedList";
import { useSearchPage } from "@/hooks/useSearchPage";
import Header from "@/components/header";

const SearchPage = () => {
  const {
    searchUsers,
    inputName,
    inputFavTeam,
    handleInputChange,
    handleInputFavTeamChange,
  } = useSearchPage();

  return (
    <>
      <Header />
      <Container mt="60px" py="16px" maxW={["90%", "90%", "80%", "70%"]}>
        <Box>
          <Heading fontWeight={"light"} pb="16px">
            相手を探す
          </Heading>
          <Text>
            名前、好きな球団、好きな選手、タグを用いて検索することが出来ます。
          </Text>
        </Box>

        {/* 名前検索 */}
        <InputGroup size="md">
          <Input
            placeholder="名前で検索"
            value={inputName}
            onChange={handleInputChange}
          />
        </InputGroup>

        {/* 詳細検索 */}
        <DetailedSearch
          inputFavTeam={inputFavTeam}
          handleInputFavTeamChange={handleInputFavTeamChange}
        />

        {/* 一覧 */}
        <SearchedList searchUsers={searchUsers} />
      </Container>
    </>
  );
};

export default SearchPage;
