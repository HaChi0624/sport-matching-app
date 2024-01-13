import { atom } from "recoil";
import { userProf } from "@/types/user";

export const userProfState = atom<userProf>({
  key: "userProfState",
  default: {
    uid: "",
    userName: "",
    favTeam: "",
    favPlayers: "",
    comment: "",
    photoURL: "",
  },
});

// https://zenn.dev/tera_ny/articles/e478fce56db413
