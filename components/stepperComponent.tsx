import {
  Box,
  Link,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";
import styles from "@/styles/stepper.module.css";

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

const StepperComponent = () => {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Stepper
      index={activeStep}
      orientation="vertical"
      gap="0"
      mx={"auto"}
      h={["300px", "400px", "400px", "400px"]}
      w={["380px", "420px", "480px", "600px"]}
      //   bg={["red", "green", "blue", "gray"]}
      //   mb='20px'
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
            <StepDescription
              className={styles.parent}
              // maxWidth={["280px", "380px", "380px", "520px"]}
              //   style={{ maxWidth: "280px" }}
            >
              <Link
                className={styles.child}
                href={step.link}
                // fontSize={["15px", "18px", "18px", "24px"]}
                ml="10px"
              >
                {step.description}
              </Link>
            </StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperComponent;
