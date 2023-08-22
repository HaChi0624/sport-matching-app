import {
  Input,
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Select,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

const DetailedSearch = (props: {
  inputFavTeam: string;
  handleInputFavteamChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const { inputFavTeam, handleInputFavteamChange } = props;

  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <Box>
                <AccordionButton bg="gray.100">
                  <Box as="span" flex="1" textAlign="left">
                    詳細検索
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </Box>
              <AccordionPanel pb={4}>
                <Box fontSize={"20px"} pt={"6px"}>
                  好きな球団
                </Box>
                <Select
                  onChange={handleInputFavteamChange}
                  value={inputFavTeam}
                >
                  <option value="未選択">未選択</option>
                  <option value="ヤクルト">ヤクルト</option>
                  <option value="Dena">Dena</option>
                  <option value="阪神">阪神</option>
                  <option value="巨人">巨人</option>
                  <option value="広島">広島</option>
                  <option value="中日">中日</option>
                  <option value="オリックス">オリックス</option>
                  <option value="ソフトバンク">ソフトバンク</option>
                  <option value="西武">西武</option>
                  <option value="楽天">楽天</option>
                  <option value="ロッテ">ロッテ</option>
                  <option value="日本ハム">日本ハム</option>
                  <option value="その他">その他</option>
                </Select>

                <Box fontSize={"20px"} pt={"6px"}>
                  好きな選手
                </Box>
                <Input
                  placeholder="検索"
                  // value={inputFavPlayer}
                  // onChange={handleInputChange}
                />
                <Box fontSize={"20px"} pt={"6px"}>
                  タグ ※未実装
                </Box>
                <Input
                  placeholder="検索"
                  // value={inputValue}
                  // onChange={handleInputChange}
                />
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default DetailedSearch;
