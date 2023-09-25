import { Avatar, Box, Link, Text } from "@chakra-ui/react";
import styles from "@/styles/chatPage.module.css";
import { useChatPage } from "@/hooks/useChatPage";

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
    <Box m="0 auto" zIndex={10} className={styles.chatBox}>
      {chatLogs.map((item) => (
        <Box
          key={item.key}
          style={{
            display: "flex",
            marginLeft: user1Name === item.userName ? "3px" : "auto",
            justifyContent:
              user1Name === item.userName ? "flex-end" : "flex-start",
          }}
        >
          {user1Name === item.userName ? (
            <Box display={'flex'} alignItems={'flex-end'} paddingBottom={'32px'}>
              <Box paddingRight={'4px'}>{formatMD(item.createdAt)}</Box>
              <Box>{formatHHMM(item.createdAt)}</Box>
            </Box>
          ) : (
            <Link href={`/posts/friendProfilePage/${user2Id}`}>
              <Avatar
                src={user1Name === item.userName ? photoURL : user2PhotoURL}
                mt='24px'
              />
            </Link>
          )}

          <Box
            className={
              user1Name === item.userName
                ? `${styles.chatSide} ${styles.chatSideRight}`
                : `${styles.chatSide} ${styles.chatSideLeft}`
            }
          >
            <Text textAlign={user1Name === item.userName ? "right" : "left"}>{user2Name}</Text>
            <Text
              className={
                user1Name === item.userName
                  ? `${styles.chatTxt} ${styles.chatTxtRight}`
                  : `${styles.chatTxt} ${styles.chatTxtLeft}`
              }
            >
              {item.msg}
            </Text>
          </Box>

          {user1Name === item.userName ? (
            <Link href={`/posts/friendProfilePage/${user2Id}`}>
              <Avatar
                src={user1Name === item.userName ? photoURL : user2PhotoURL}
                mt='24px'
              />
            </Link>
          ) : (
            <Box display={'flex'} alignItems={'flex-end'} paddingBottom={'32px'}>
              <Box paddingRight={'4px'}>{formatMD(item.createdAt)}</Box>
              <Box>{formatHHMM(item.createdAt)}</Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ChatLogs;
