/**
 * 出来ること
 ページ移動間の固定レイアウト
 componentsDidCatchを使用下カスタムエラーハンドリング
 状態管理ライブラリとの結合
 
 全ページで必要な挙動を書ける場所なので、他にも広告まわりの関数の実行や、NProgressなどのローディングを設定したりしています。
 注意すべき点はNext.jsが用意するページコンポーネントと同じ挙動を取るので、_app.jsはサーバーサイドでレンダリング
 （getInitialPropsの実行を含む）され、ライフサイクルのイベントはクライアントサイドでも実行されます。
 */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
