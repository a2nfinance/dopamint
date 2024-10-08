import { MobileLayoutProvider } from '@/components/MobileLayout';
import { store } from "@/controller/store";
import "@/styles/app.css";
import withTheme from '@/theme';
import '@solana/wallet-adapter-react-ui/styles.css';
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';
// import NProgress from "nprogress";
import { WalletContextProvider } from '@/contexts/WalletContextProvider';
import { useEffect, useState } from 'react';
import { Provider } from "react-redux";

// Router.events.on("routeChangeStart", (url) => {
//     NProgress.start()
// })

// Router.events.on("routeChangeComplete", (url) => {
//     NProgress.done()
// })

// Router.events.on("routeChangeError", (url) => {
//     NProgress.done()
// })


export default function MyApp({ Component, pageProps }: AppProps) {

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (typeof window !== 'undefined') {
        window.onload = () => {
            document.getElementById('holderStyle')!.remove();
        };
    }

    return (
        <WalletContextProvider>
            <Provider store={store}>
                <style
                    id="holderStyle"
                    dangerouslySetInnerHTML={{
                        __html: `
                    *, *::before, *::after {
                        transition: none!important;
                    }
                    `,
                    }}
                />

                <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>

                    {

                        withTheme(<MobileLayoutProvider>

                            <Component {...pageProps} />

                        </MobileLayoutProvider>)
                    }

                </div>
            </Provider >
        </WalletContextProvider>


    )
}
