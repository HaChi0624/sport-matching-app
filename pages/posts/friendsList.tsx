import { Container, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import ProfileCards from "../components/profileCards";
import { useEffect } from "react";

import { db } from "../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { User } from "../../types/user"


const friendsList = () => {

  ///
  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    const userData = collection(db, "users");
    onSnapshot(userData, (snapshot) => {
      const newUser: User[] = [];
      snapshot.docs.map((doc) => {
        const user = {
          id: doc.id,
          title: doc.data().title,
          detail: doc.data().detail,
          status: doc.data().status,
          createDate: doc.data().createDate.toDate(),
          updateDate: doc.data().updateDate.toDate(),
        };
        newUser.push({ ...user });
      });
      setUser(newUser);
    });
  };
  ///

  const users =
  // const users = [
  //   {
  //     id: 1,
  //     name: "aaa",
  //   },
  //   {
  //     id: 2,
  //     name: "bbb",
  //   },
  //   {
  //     id: 3,
  //     name: "ccc",
  //   },
  //   {
  //     id: 4,
  //     name: "ddd",
  //   },
  // ];

  return (
    <Container>
      <Wrap>
        {users.map((user: User) => (
          <WrapItem key={user.id}>
            <ProfileCards />
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  );
};

export default friendsList;
