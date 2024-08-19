import { create, fetchAsset, mplCore } from '@metaplex-foundation/mpl-core'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { createSignerFromWalletAdapter, walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
// import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata"
// import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'
import { generateSigner, Signer, TransactionBuilderSendAndConfirmOptions, Umi } from "@metaplex-foundation/umi"
import { useWallet } from '@solana/wallet-adapter-react'
// import { nftStorageUploader } from '@metaplex-foundation/umi-uploader-nft-storage';
import { base58 } from "@metaplex-foundation/umi/serializers"
import { useCanvasClient } from './useCanvasClient'

const txConfig: TransactionBuilderSendAndConfirmOptions = {
    send: { skipPreflight: true },
    confirm: { commitment: 'processed' },
};
let umi: Umi;
export const useUMI = () => {
    const wallet = useWallet();
    const { client } = useCanvasClient();

    const getUmi = () => {
        if (umi) return;
        //Create Umi instance
        umi = createUmi(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
            // .use(mplTokenMetadata())
            // .use(mplCandyMachine())
            .use(mplCore())
            .use(walletAdapterIdentity(wallet));


    }

    const createAsset = async () => {
        try {
            await wallet.connect();
            getUmi();
            // let walletSigner = createSignerFromWalletAdapter(wallet)
            const assetSigner = generateSigner(umi)
            console.log("assetSigner", assetSigner);
            const transactionBuilder = create(umi, {
                asset: assetSigner,
                name: 'Test assets',
                uri: 'https://arweave.net/5Y3Ux0g1gXyp9M9OPWpAP2qEBeeRg_qGA9k-jcjync0'
            });
            // const signature = await transactionBuilder.send(umi);
            console.log(client);
            const signedTxResults = await client!.signAndSendTransaction({
                chainId: "solana:103",
                unsignedTx: transactionBuilder.build(umi).serializedMessage.toString(),
            });
            if (signedTxResults.untrusted.success) {
                // signedTx.value = signedTxResults.untrusted.signedTx;
                console.log("Token created successfully!", signedTxResults.untrusted);
                // triggerToast("Token created successfully!", "success");
            } else if (signedTxResults.untrusted.success === false) {
                console.error("Failed to create token", signedTxResults.untrusted.error);
                // triggerToast("Failed to create token", "error");
            }
            // await createTx.sendAndConfirm(umi, txConfig)
            // console.log(base58.deserialize(createTx.signature)[0])
        } catch (e) {
            console.log("Error:", e);
        }

    }

    const getAsset = async (publicKey: string) => {
        getUmi();
        const req = await fetchAsset(umi, publicKey, {
            skipDerivePlugins: false,
        })
        console.log(req)
    }
    return { createAsset, getAsset }
}