import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import styles from "@/styles/top.module.css";

import router from "next/router";
import Footer from "@/components/footer";
import Header from "@/components/header/header";
import { useAuth } from "@/hooks/useAuth";
import LoginButton from "@/components/header/loginButton";

const Top = () => {
  const { status } = useAuth();
  const steps = [
    {
      title: "プロフィールを作ろう",
      text: "好きなチームや選手を書こう！",
      button: "作ってみる",
      src: "/top/top1.jpg",
      link: "/posts/myProfilePage",
    },
    {
      title: "相手を探そう",
      text: "気になる相手を探そう！チーム名や選手名で検索するといい人が見つかるかも！",
      button: "探してみる",
      src: "/top/top2.jpg",
      link: "/posts/searchPage",
    },
    {
      title: "チャットで話そう",
      text: "相手が見つかればチャットで日程を決めたり、好きな選手のことを話そう！",
      button: "チャットをする",
      src: "/top/top3.jpg",
      link: "/posts/friendListPage",
    },
  ];

  return (
    <>
      <Header />
      <Box mt={["-70px", "-70px", "-70px", "40px"]} bg={"blackAlpha.300"}>
        {/* メインビジュアル */}
        <Box>
          <Box
            bgImage={"/top/main-visual-1000-600.png"}
            bgSize={"cover"}
            bgPosition={"center center"}
          >
            <Box h="700px"></Box>
          </Box>
        </Box>

        <Box bg="white" borderRadius={"20px"} className={styles.container}>
          <Box py="40px" m="0 auto">
            <Box
              textAlign={"center"}
              fontSize={["28px", "36px", "36px", "36px"]}
            >
              ―３つのステップ―
            </Box>
          </Box>

          {steps.map((step, index) => (
            <Box key={index} className={styles.wrapper}>
              <Box className={styles.img}>
                <Image
                  src={step.src}
                  alt="img"
                  className={styles.imgItem}
                  borderRadius={"10px"}
                />
              </Box>
              <Box className={styles.wrapperItem}>
                <Heading className={styles.heading}>{step.title}</Heading>
                <Text>{step.text}</Text>
                {status === 'NOT_LOGGED_IN' ? (
                  <LoginButton buttonTitle={step.button} bg='#fff100' className={styles.button} />
                ) : (
                  <Button
                    onClick={() => router.push(step.link)}
                    className={styles.button}
                    bg="#fff100"
                  >
                    {step.button}
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Top;
