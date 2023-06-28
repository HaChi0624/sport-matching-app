/**
 * 出来ること
 ページ移動間の固定レイアウト
 componentsDidCatchを使用下カスタムエラーハンドリング
 状態管理ライブラリとの結合
 
 全ページで必要な挙動を書ける場所なので、他にも広告まわりの関数の実行や、NProgressなどのローディングを設定したりしています。
 注意すべき点はNext.jsが用意するページコンポーネントと同じ挙動を取るので、_app.jsはサーバーサイドでレンダリング
 （getInitialPropsの実行を含む）され、ライフサイクルのイベントはクライアントサイドでも実行されます。
 */

import type { AppProps } from "next/app";
// import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { useAuth } from "@/firebase/authFunctions";
import CommonLayout from "@/components/commonLayout";

import { AuthProvider } from "@/firebase/auth/authProvider";
import Header from "@/components/header";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <AuthProvider>
          <CommonLayout>
            <Header />
            <Component {...pageProps} />
          </CommonLayout>
        </AuthProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}
