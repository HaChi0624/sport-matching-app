import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Stack,
  Text,
  VStack,
  Link,
  Divider,
} from "@chakra-ui/react";
import styles from "@/styles/top.module.css";

// import NextLink from "next/link";
// import Link from "next/link";
import IMG_1014 from "@/src/IMG_1014.png";
import Slider from "@/components/slider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SnsIcon from "@/components/snsIcon";

import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

const steps = [
  {
    title: "First",
    description: ">>>プロフィールの作成",
    link: "/posts/myProfilePage",
  },
  { title: "Second", description: ">>>相手を探す", link: "/posts/search" },
  {
    title: "Third",
    description:
      ">>>相手が見つかればチャットで日程を決めたり、好きな選手のことを話そう！",
    link: "/posts/friendList",
  },
];

const Top = () => {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  // 押すとindexの値が１つ進む
  //

  return (
    <Box>
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
        <Stepper
          index={activeStep}
          orientation="vertical"
          height={["300px", "400px", "400px", "400px"]}
          gap="0"
          // mb='20px'
          // marginX={['10px','10px','10px','10px']}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                {/* タイトル */}
                <StepTitle>
                  <Text fontSize={["28px", "36px", "36px", "36px"]}>
                    {step.title}
                  </Text>
                </StepTitle>

                {/* 内容 */}
                <StepDescription>
                  <Text
                    // className={styles.button}
                    fontSize={["15px", "18px", "18px", "24px"]}
                    maxWidth={["280px", "380px", "380px", "520px"]}
                    ml="10px"
                  >
                    <Link href={step.link}>{step.description}</Link>
                  </Text>
                </StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

export default Top;
