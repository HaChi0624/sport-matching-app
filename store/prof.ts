import { atom, selector } from "recoil";

type prof = {
  uid: "";
  userName: "";
  favTeam: "";
  favPlayers: "";
  comment: "";
  photoURL: "";
};

export const userProfState = atom({
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