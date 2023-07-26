import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    uid: "",
    photoURL: "",
  }, // default to user with empty UID
});
