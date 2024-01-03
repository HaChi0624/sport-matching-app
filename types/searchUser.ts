export type FriendStatus = "request" | "requested" | "friend" | null;

export type searchUser = {
  uid: string;
  userName: string;
  photoURL: string;
  friendStatus?: FriendStatus;
};
