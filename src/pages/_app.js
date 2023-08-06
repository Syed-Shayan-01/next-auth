import Header from "@/components/header";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react"

export default function App({   Component,
  pageProps: { session, ...pageProps }, }) {
  return (
    <>
     <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
     </SessionProvider>
    </>
  );
}
