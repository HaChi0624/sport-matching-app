// 各userのプロフィールページに割り当てられる情報
export type userProf = {
  uid: string;
  userName: string;
  favTeam: string;
  favPlayers: string;
  comment: string;
  photoURL: string;
};

// 検索対象の最低限のuser情報
export type User = {
  uid: string;
  userName: string;
  photoURL: string;
};
