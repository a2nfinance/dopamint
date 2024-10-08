import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';

import { MESSAGE_TYPE, openNotification } from "@/utils/noti";
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useCallback, useMemo } from 'react';


const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    // const { autoConnect } = useAutoConnect();
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
   
    const wallets = useMemo(
        () => [
            // new PhantomWalletAdapter(),
            // new SolflareWalletAdapter(),
            // new SolongWalletAdapter({ network }),
            // new TorusWalletAdapter(),

            // new LedgerWalletAdapter(),
            // new SlopeWalletAdapter(),
        ],
        [network]
    );

    const onError = useCallback(
        (error: WalletError) => {
            openNotification("Action Fail", error.message ? `${error.name}: ${error.message}` : error.name, MESSAGE_TYPE.ERROR);
            console.error(error);
        },
        []
    );

    return (
        // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect>
                <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        // <AutoConnectProvider>
        <ContextProvider>{children}</ContextProvider>
        // </AutoConnectProvider>
    );
};