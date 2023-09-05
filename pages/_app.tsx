import type {AppProps} from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

import { AuthProvider } from "@/firebase/auth/authProvider";

export default function App({ Component, pageProps } : AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}
