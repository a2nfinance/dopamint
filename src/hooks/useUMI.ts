import { File } from "buffer"
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
// import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
// import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'
import { useWallet } from '@solana/wallet-adapter-react'
import { GenericFile, Umi } from "@metaplex-foundation/umi"
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
// import { nftStorageUploader } from '@metaplex-foundation/umi-uploader-nft-storage';
import { bundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";

let umi: Umi;
export const useUMI = () => {
    const wallet = useWallet()

    // const getUmi = () => {
    //     if (umi) return;
    //     //Create Umi instance
    //     umi = createUmi(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
    //         // .use(mplTokenMetadata())
    //         // .use(mplCandyMachine())
    //         .use(mplCore())
    //         // Register Wallet Adapter to Umi
    //         .use(walletAdapterIdentity(wallet))
    //         .use(irysUploader());
    //     // umi.use(bundlrUploader({providerUrl: 'https://api.mainnet-beta.solana.com', timeout: 6000}))

    // }
    const uploadFromLink = async (link: string) => {
        // await wallet.connect();
        // if (!wallet.connected) return;
        // getUmi();
        let req = await fetch("/api/getFileContentFromURI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uri: link, name: "forest", fileType: "jpeg", owner: "okok" })
        })
        const res = await req.json();
        console.log(res.fileUri);
    }
    const uploadFromFile = async (file: File) => {

    }
    const uploadMetadata = async () => {

    }

    return { uploadFromLink }
}