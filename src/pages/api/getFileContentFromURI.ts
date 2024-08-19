
import { GenericFile } from '@metaplex-foundation/umi';
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from "dotenv"
import { buildUmiUploader } from '@/utils/umiUtils';
import { Uploader } from '@/utils/uploader';
import { mplCore } from '@metaplex-foundation/mpl-core';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
dotenv.config();
const uploadFileFromURL = async (url, name="asset", fileType="png") => {

    const response = await fetch(url);
    const data: Blob = await response.blob();
    const bufferData = Buffer.from(await data.arrayBuffer());
    const umi = buildUmiUploader(
        process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
        JSON.parse(process.env.UPLOADER_SECRET_KEY!)
    )
    umi.use(mplCore()).use(irysUploader());
    const umiUploader = new Uploader(umi);
    let uploadedImageUri = await umiUploader.uploadImage(bufferData, name || "asset", fileType || "png");
    // let file =  new File([data], name, {
    //     type: data.type || defaultType,
    // });
    // let genericFile: GenericFile = {
    //     buffer: new Uint8Array(await data.arrayBuffer()),
    //     fileName: name,
    //     displayName: name,
    //     uniqueName: name,
    //     contentType: defaultType,
    //     extension: extension,
    //     tags: tags
    // }
    // return genericFile
    return uploadedImageUri;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            owner,
            uri,
            name,
            fileType
        } = req.body;
        if (owner) {

            try {
                let fileUri = await uploadFileFromURL(uri, name, fileType);
                return res.status(200).send({fileUri: fileUri});
            } catch (error) {
                console.log(error)
                return res.status(500).send(error.message);
            }
        } else {
            res.status(422).send('data_incomplete');
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default handler;