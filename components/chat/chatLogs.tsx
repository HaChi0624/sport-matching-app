import { Avatar, Box, HStack, Link, Text } from "@chakra-ui/react";
import { useChatPage } from "@/hooks/useChatPage";
import styles from "@/styles/chatPage.module.css";

const ChatLogs = () => {
  const {
    user1Name,
    user2Name,
    user2Id,
    chatLogs,
    photoURL,
    user2PhotoURL,
    formatMD,
    formatHHMM,
  } = useChatPage();

  return (
    <Box
      w="80%"
      m="0 auto"
      //   mb="100px"
      // overflowY={"scroll"}
      zIndex={10}
      className={styles.sbBox}
    >
      {chatLogs.map((item) => (
        <HStack
          key={item.key}
          style={{
            marginLeft: user1Name === item.userName ? "3px" : "auto",
            justifyContent:
              user1Name === item.userName ? "flex-end" : "flex-start",
          }}
        //   className={styles.sbBox}
        >
          <>
            {user1Name === item.userName ? (
              <HStack>
                <Box>{formatMD(item.createdAt)}</Box>
                <Box>{formatHHMM(item.createdAt)}</Box>
              </HStack>
            ) : (
              <Link href={`/posts/friendProfilePage/${user2Id}`}>
                <Avatar
                  src={user1Name === item.userName ? photoURL : user2PhotoURL}
                  size={["sm", "sm", "md"]}
                />
              </Link>
            )}

            <Box
              className={
                user1Name === item.userName
                  ? `${styles.sbSide} ${styles.sbSideRight}`
                  : `${styles.sbSide} ${styles.sbSideLeft}`
              }
            >
              <Text
                className={
                  user1Name === item.userName
                    ? `${styles.sbTxt} ${styles.sbTxtRight}`
                    : `${styles.sbTxt} ${styles.sbTxtLeft}`
                }
              >
                {item.msg}
              </Text>
            </Box>

            {user1Name === item.userName ? (
              <Link href={`/posts/friendProfilePage/${user2Id}`}>
                <Avatar
                  src={user1Name === item.userName ? photoURL : user2PhotoURL}
                  //   size={["sm", "sm", "md"]}
                />
              </Link>
            ) : (
              <HStack>
                <Box>{formatMD(item.createdAt)}</Box>
                <Box>{formatHHMM(item.createdAt)}</Box>
              </HStack>
            )}
          </>
        </HStack>
      ))}
    </Box>
    // <>
    //   <div className={styles.sbBox}>
    //     <div className={`${styles.iconImg} ${styles.iconImgLeft}`}>
    //       <Avatar src={photoURL} size={["sm", "sm", "md"]} />
    //     </div>
    //     <div className={`${styles.iconName} ${styles.iconNameLeft}`}>
    //       アイコンネーム（左）
    //     </div>
    //     <div className={`${styles.sbSide} ${styles.sbSideLeft}`}>
    //       <div className={`${styles.sbTxt} ${styles.sbTxtLeft}`}>
    //         ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
    //       </div>
    //     </div>
    //   </div>

    //   <div className={styles.sbBox}>
    //     <div className={`${styles.iconImg} ${styles.iconImgRight}`}>
    //       ←ココにカーソルをあてて『メディア（画像）を追加』する
    //     </div>
    //     <div className={`${styles.iconName} ${styles.iconNameRight}`}>
    //       アイコンネーム（右）
    //     </div>
    //     <div className={`${styles.sbSide} ${styles.sbSideRight}`}>
    //       <div className={`${styles.sbTxt} ${styles.sbTxtRight}`}>
    //         ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default ChatLogs;
