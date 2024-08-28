import { create, ExternalPluginAdapterSchema, mplCore, PluginAuthority, writeData } from '@metaplex-foundation/mpl-core'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { generateSigner, TransactionBuilderSendAndConfirmOptions, Umi } from "@metaplex-foundation/umi"
import { WalletContextState } from '@solana/wallet-adapter-react'

import { base58 } from "@metaplex-foundation/umi/serializers"
import type { WalletName } from '@solana/wallet-adapter-base'
import { useCallback } from 'react'
import { useCanvasClient } from './useCanvasClient'



const txConfig: TransactionBuilderSendAndConfirmOptions = {
    send: { skipPreflight: true },
    confirm: { commitment: 'processed' },
};
let umi: Umi;
export const useUMI = () => {
    const { initializeCanvas, state } = useCanvasClient();


    const getUmi = async (wallet) => {
        if (umi) return;
        console.log(wallet, state);
        await wallet.connect();
        //Create Umi instance
        umi = createUmi(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
            // .use(mplTokenMetadata())
            // .use(mplCandyMachine())
            .use(mplCore())
            .use(walletAdapterIdentity(wallet));


    }

    const createAsset = useCallback(async (wallet: WalletContextState, template: any) => {
        try {
            await getUmi(wallet);
            // Check NFT plugin here
            const dataAuthority: PluginAuthority = {
                type: 'Address',
                // @ts-ignore
                address: wallet.publicKey
            }
            const json = {
                timeStamp: Date.now(),
                message: 'Hello, World!',
            }

            const data = new TextEncoder().encode(JSON.stringify(json))
            const assetSigner = generateSigner(umi);
            const transactionBuilder = create(umi, {
                asset: assetSigner,
                name: template.name,
                uri: template.metadata_uri,
                plugins: [
                    {
                        type: 'AppData',
                        dataAuthority: dataAuthority,
                        schema: ExternalPluginAdapterSchema.Json,
                    },
                ],
            });

            let createTx = await transactionBuilder.sendAndConfirm(umi, txConfig);

            let signature = base58.deserialize(createTx.signature)[0];
            if (signature) {
                let writeDataTx = await writeData(umi, {
                    key: {
                        type: 'AppData',
                        dataAuthority,
                    },
                    data: data,
                    asset: assetSigner.publicKey,
                }).sendAndConfirm(umi)
                let signature1 = base58.deserialize(writeDataTx.signature)[0];
                console.log(signature1);
                // Update history
                if (state.user?.id) {
                    let req = await fetch("/api/history/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            template_id: template._id,
                            user_id: state.user.id,
                            metadata_uri: template.metadata_uri
                        })
                    })
                    let res = await req.json();
                    console.log(res);
                }

            }


        } catch (e) {

            console.log("Error:", e);
        }

    }, [state.user])

    const selectCanvasWallet = async (wallet) => {

        await initializeCanvas(true);
        const canvasWallet = "DSCVR Canvas" as WalletName<"DSCVR Canvas">;
        wallet.select(canvasWallet);
        console.log("Select wallet DSCVR Canvas")

    }

    // const getAsset = async (publicKey: string) => {
    //     getUmi();
    //     const req = await fetchAsset(umi, publicKey, {
    //         skipDerivePlugins: false,
    //     })
    //     console.log(req)
    // }
    return { createAsset, selectCanvasWallet }
}