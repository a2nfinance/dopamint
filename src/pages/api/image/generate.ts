import connect from '@/database/connect';
import dotenv from "dotenv"
dotenv.config();
import OpenAI from "openai";
import GeneratedImage from "@/database/models/generatedimage";
import { NextApiRequest, NextApiResponse } from 'next';
import { buildUmiUploader } from '@/utils/umiUtils';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { mplCore } from '@metaplex-foundation/mpl-core';
import { Uploader } from '@/utils/uploader';

let openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

const uploadImage = async (url: string) => {
    const response = await fetch(url);
    const data: Blob = await response.blob();
    const bufferData = Buffer.from(await data.arrayBuffer());
    const umi = buildUmiUploader(
        process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
        JSON.parse(process.env.UPLOADER_SECRET_KEY!)
    )
    umi.use(mplCore()).use(irysUploader());
    const umiUploader = new Uploader(umi);
    let uploadedImageUri = await umiUploader.uploadImage(bufferData, "generated_image", "jpg");
    return uploadedImageUri;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            owner,
            prompt,
            size,
            model,
            open_api_key
        } = req.body;
        if (owner) {
           
            try {
                if (open_api_key) {
                    openai = new OpenAI({ apiKey: open_api_key });
                }
                const image = await openai.images.generate({
                    model: model,
                    n: 1,
                    prompt: prompt,
                    size: size
                });
                let uploadImages: {url: string}[] = [];
                if (image.data && image.data.length) {
                    for(let i=0; i< image.data.length; i++) {
                        let url = image.data[i].url;
                        if (url) {
                            let newUrl = await uploadImage(url);
                            uploadImages.push({url: newUrl});
                        }
                       
                    }
                    let obj = new GeneratedImage({ ...req.body, image: uploadImages });
                    await obj.save();
                }
                return res.status(200).send(uploadImages);
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

export default connect(handler);