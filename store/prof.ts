import { atom } from "recoil";

// export const userNameState = atom({
//   key: "username",
//   default: "",
// });
// export const favTeamState = atom({
//   key: "favteam",
//   default: "",
// });
// export const favPlayersState = atom({
//   key: "favplaysers",
//   default: "",
// });
// export const commentState = atom({
//   key: "comment",
//   default: "",
// });

export const profState = atom({
  key: "prof",
  default: [
    {
      uid: "",
      username: "",
      favTeam: "",
      favplaysers: "",
      comment: "",
    },
  ],
});
