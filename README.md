## 1,アプリ名、概要
### アプリ名
スポーツマッチングアプリ略して「スポッチ」です。
野球以外のスポーツのマッチング機能を今後追加することを想定して、野球だけに縛られない名前にしました。
ひとりぼっちでも参加できるというコンセプトもあったので濁音の「スボッチ」にすることも考えましたが、音の響きを考慮してやめました。

### 概要
野球観戦を通じて友達を作るマッチングアプリです。
「誰かとスポーツを見てみたい。」「スポーツを通して友達を作りたい。」というニーズに応えるアプリです。
マッチングアプリらしく、プロフィールの作成、マッチングしたらチャットで会話という流れを組みます。
現状はマッチングアプリとしての機能しか持ちませんが、今後の機能追加でよりSNSとしての側面を強くできるように画策しています。

### URL
https://sport-matching-app.vercel.app

### テスト用アカウント
- メールアドレス：test@gmail.com
- パスワード：testtest


## 2,使用技術
- Next.js
  - 13.4で開発し、デプロイ時に12に変更
- TypeScript
- recoil
- firebase
  - Authentication、Firestore Database、Storageを使用
- vercel
  - デプロイ時に使用
- chakra-ui

## 3,機能
- ユーザー登録、ログイン機能
  - メールアドレス＆パスワード、グーグルログインの２種類
  - x、instagramのログイン機能も追加予定です。
- CRUD
  - プロフィール、チャットで使用しています。
- 画像投稿
  - プロフィールで使用。チャットも実装予定。
- フォロー機能
  - 相互に認証することで友達になります。
- 通知機能
  - フォローされたときにヘッダーの通知にバッジが付き、ログが追加されます。未読のチャットに関しても今後通知に追加されるようにする予定です。
- チャット機能
  - 友達になることでチャットが出来ます。現状テキストのみしか扱えていないので、リンクや画像などをアップロードできるようにする予定です。
- 検索機能
  - 名前による検索と選択式の検索を実装しました。
- レスポンシブ対応
  - chakra uiで４種類実装しました。

## 4,まだ出来ていないこと
- パスワードの変更機能
- 日程調整の機能
  - 過去に行った試合の記録が残ったりすると面白そう
- ブログ機能
  - その日の試合やスポーツバーや居酒屋に行ってきた様子などを投稿出来るように
- 広告を載せる場所

