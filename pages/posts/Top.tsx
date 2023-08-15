import { Box, Text } from "@chakra-ui/react";
import styles from "@/styles/top.module.css";

import StepperComponent from "@/components/stepperComponent";

const Top = () => {
  // 押すとindexの値が１つ進む
  //

  return (
    <Box pt="60px">
      <Box className={styles.title}>
        <Text fontSize={["35px", "42px", "56px", "56px"]} pointer-events="none">
          スポッチで一緒に
        </Text>
        <Text fontSize={["35px", "42px", "56px", "56px"]} ml="64px">
          野球を楽しもう！
        </Text>
      </Box>

      <Box
        // mb="40px"
        m="0 auto"
        maxWidth={["90%", "70%", "70%", "50%"]}
      >
        <Box
          textAlign={"center"}
          fontSize={["36px", "36px", "36px", "36px"]}
          mb="30px"
        >
          ―３つのステップ―
        </Box>
        <StepperComponent />
      </Box>
    </Box>
  );
};

export default Top;
