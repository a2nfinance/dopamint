import { File } from "buffer"
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
// import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
// import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'
// import { useWallet } from '@solana/wallet-adapter-react'
import { GenericFile, Umi } from "@metaplex-foundation/umi"
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
let umi: Umi;
export const useUMI = () => {
    // const wallet = useWallet()
    const getFileFromURL = async (url, name, defaultType = 'image/jpeg', extension="jpeg", tags=[]) => {
        const response = await fetch(url);
        const data: Blob = await response.blob();
        // let file =  new File([data], name, {
        //     type: data.type || defaultType,
        // });
        let genericFile: GenericFile = {
            buffer: new Uint8Array(await data.arrayBuffer()),
            fileName: name,
            displayName: name,
            uniqueName: name,
            contentType: defaultType,
            extension: extension,
            tags: tags
        }
        return genericFile
    }
    const getUmi = () => {
        if (umi) return;
        // Create Umi instance
        // umi = createUmi('https://api.mainnet-beta.solana.com')
        //     // .use(mplTokenMetadata())
        //     // .use(mplCandyMachine())
        //     .use(mplCore())
        //     // Register Wallet Adapter to Umi
        //     .use(walletAdapterIdentity(wallet))
        // umi.use(irysUploader())

    }
    const uploadFromLink = async (link: string) => {
        // await wallet.select();
        getUmi();
        let file: GenericFile = await getFileFromURL(link, "test");
        const [imageUri] = await umi.uploader.upload([file]);
        console.log(imageUri);
    }
    const uploadFromFile = async (file: File) => {

    }
    const uploadMetadata = async () => {

    }

    return {uploadFromLink}
}