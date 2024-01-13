import { User } from "./user";

export type FriendStatus = "request" | "requested" | "friend" | null;

export type searchUser = User | FriendStatus;
