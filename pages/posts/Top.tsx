import { Box, Button, Heading, Text } from "@chakra-ui/react";
import styles from "@/styles/top.module.css";

// import StepperComponent from "@/components/stepperComponent";
import { Image } from "@chakra-ui/react";
const Top = () => {
  const steps = [
    {
      title: "プロフィールを作ろう",
      text: "好きなチームや選手を書こう！",
      button: "作ってみる",
      src: "/top1.jpg",
    },
    {
      title: "相手を探そう",
      text: "気になる相手を探そう！チーム名や選手名で検索するといい人が見つかるかも！",
      button: "探してみる",
      src: "/top2.jpg",
    },
    {
      title: "チャットで話そう",
      text: "相手が見つかればチャットで日程を決めたり、好きな選手のことを話そう！",
      button: "チャットをする",
      src: "/top3.jpg",
    },
  ];

  return (
    <Box pt="60px">
      <Box className={styles.title}>
        <Text fontSize={["35px", "42px", "56px", "56px"]} pointerEvents="none">
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
          fontSize={["28px", "36px", "36px", "36px"]}
          mb="30px"
        >
          ―３つのステップ―
        </Box>
        {/* <StepperComponent /> */}
      </Box>

      {/* <Box className={styles.container}> */}
      {steps.map((step, index) => (
        <Box key={index} className={styles.wrapper}>
          <Box className={styles.img}>
            <Image src={step.src} alt="img" className={styles.imgItem} />
          </Box>
          <Box className={styles.wrapperItem}>
            <Heading className={styles.heading}>{step.title}</Heading>
            <Text>{step.text}</Text>
            <Button bg="blue.200">{step.button}</Button>
          </Box>
        </Box>
      ))}
    </Box>
    // </Box>
  );
};

export default Top;
