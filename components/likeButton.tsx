import { Button } from "@chakra-ui/react";

const LikeButton = () => {
  return (
    <>
      <Button onClick={() => alert("👍いいね")}>👍いいね</Button>
    </>
  );
};

export default LikeButton;
