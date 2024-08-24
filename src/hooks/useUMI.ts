import { create, fetchAsset, mplCore } from '@metaplex-foundation/mpl-core'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
// import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata"
// import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'
import { generateSigner, TransactionBuilderSendAndConfirmOptions, Umi } from "@metaplex-foundation/umi"
import { useWallet } from '@solana/wallet-adapter-react'
// import { nftStorageUploader } from '@metaplex-foundation/umi-uploader-nft-storage';
import { base58 } from "@metaplex-foundation/umi/serializers"
import { useCanvasClient } from './useCanvasClient'
import type { WalletName } from '@solana/wallet-adapter-base'
import { useCallback, useEffect } from 'react'
import { registerCanvasWallet } from '@dscvr-one/canvas-wallet-adapter'



const txConfig: TransactionBuilderSendAndConfirmOptions = {
    send: { skipPreflight: true },
    confirm: { commitment: 'processed' },
};
let umi: Umi;
export const useUMI = () => {
    const {initializeCanvas} = useCanvasClient();
    const wallet = useWallet();

    const getUmi = async () => {
        if (umi) return;

        await wallet.connect();
        //Create Umi instance
        umi = createUmi(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
            // .use(mplTokenMetadata())
            // .use(mplCandyMachine())
            .use(mplCore())
            .use(walletAdapterIdentity(wallet));


    }

    const createAsset = async (template: any) => {
        try {
            await getUmi();
            const assetSigner = generateSigner(umi)
            const transactionBuilder = create(umi, {
                asset: assetSigner,
                name: template.name,
                uri: template.metadata_uri
            });

            console.log(wallet);
            let createTx = await transactionBuilder.sendAndConfirm(umi, txConfig);
            console.log(base58.deserialize(createTx.signature)[0]);
        } catch (e) {

            console.log("Error:", e);
        }

    }

    const selectCanvasWallet = async () => {
       
            await initializeCanvas(true);
            const canvasWallet = "DSCVR Canvas" as WalletName<"DSCVR Canvas">;
            wallet.select(canvasWallet);
        
      
    }

    const getAsset = async (publicKey: string) => {
        getUmi();
        const req = await fetchAsset(umi, publicKey, {
            skipDerivePlugins: false,
        })
        console.log(req)
    }
    return { createAsset, getAsset, selectCanvasWallet }
}