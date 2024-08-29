import { create, ExternalPluginAdapterSchema, mplCore, writeData } from '@metaplex-foundation/mpl-core'
import { generateSigner, TransactionBuilderSendAndConfirmOptions, Umi } from "@metaplex-foundation/umi"
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { WalletContextState } from '@solana/wallet-adapter-react'

import { base58 } from "@metaplex-foundation/umi/serializers"
import type { WalletName } from '@solana/wallet-adapter-base'
import { useCallback } from 'react'
import { useCanvasClient } from './useCanvasClient'
import { useDBPluginSetting } from './useDBPluginSetting'
import { useAppDispatch } from '@/controller/hooks'
import { actionNames, updateActionStatus } from '@/controller/process/processSlice'



const txConfig: TransactionBuilderSendAndConfirmOptions = {
    send: { skipPreflight: true },
    confirm: { commitment: 'processed' },
};
let umi: Umi;
export const useUMI = () => {
    const { initializeCanvas, state } = useCanvasClient();
    const { getPluginsByTemplateId } = useDBPluginSetting();
    const dispatch = useAppDispatch();

    const getUmi = async (wallet) => {
        if (umi) return;
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
            dispatch(updateActionStatus({ actionName: actionNames.mintNFTAction, value: true }))
            await getUmi(wallet);
            // Check NFT plugin here
            let plugins: any[] = await getPluginsByTemplateId(template._id);
            let appliedPlugin;
            let dataAuthority;
            let pluginData;
            if (plugins.length) {
                appliedPlugin = plugins[0];
                dataAuthority = {
                    type: 'Address',
                    // @ts-ignore
                    address: wallet.publicKey
                }

                pluginData = new TextEncoder().encode(JSON.stringify(appliedPlugin.data));

            }


            const assetSigner = generateSigner(umi);
            let transactionParams: any = {
                asset: assetSigner,
                name: template.name,
                uri: template.metadata_uri,
            }
            if (appliedPlugin) {
                transactionParams = {
                    ...transactionParams, plugins: [{
                        type: appliedPlugin.plugin_type,
                        dataAuthority: dataAuthority,
                        schema: ExternalPluginAdapterSchema.Json,

                    }]
                }
            }
            const transactionBuilder = create(umi, transactionParams);

            let createTx = await transactionBuilder.sendAndConfirm(umi, txConfig);

            let signature = base58.deserialize(createTx.signature)[0];
            if (signature) {
                if (appliedPlugin) {
                    dispatch(updateActionStatus({ actionName: actionNames.addPluginDataAction, value: true }))
                    let writeDataTx = await writeData(umi, {
                        key: {
                            type: appliedPlugin.plugin_type,
                            dataAuthority,
                        },
                        data: pluginData,
                        asset: assetSigner.publicKey,
                    }).sendAndConfirm(umi)
                    let signature1 = base58.deserialize(writeDataTx.signature)[0];
                    console.log(signature1);
                    dispatch(updateActionStatus({ actionName: actionNames.addPluginDataAction, value: false }))
                }

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
        dispatch(updateActionStatus({ actionName: actionNames.mintNFTAction, value: false }))
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