import connect from '@/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import NFTTemplate from "@/database/models/template";
import dotenv from "dotenv"
import { buildUmiUploader } from '@/utils/umiUtils';
import { Uploader } from '@/utils/uploader';
import { mplCore } from '@metaplex-foundation/mpl-core';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
dotenv.config();
const uploadJsonFile = async (url, name = "asset", fileType = "png", body) => {

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
    console.log("uploadedImageUri:", uploadedImageUri);
    let jsonURI = await umiUploader.uploadJson({
        "owner": body.owner,
        "name": name,
        "description": body.description,
        "image": uploadedImageUri,
        "animation_url": body.animation_url,
        "external_url": body.external_url,
        "attributes": [
        //   {
        //     "trait_type": "trait1",
        //     "value": "value1"
        //   },
        //   {
        //     "trait_type": "trait2",
        //     "value": "value2"
        //   }
        ],
        "properties": {
          "files": [
            // {
            //   "uri": "https://arweave.net/my-image",
            //   "type": "image/png"
            // },
            // {
            //   "uri": "https://arweave.net/my-animation",
            //   "type": "video/mp4"
            // }
          ],
          "category": "nft"
        }
      })
      console.log("jsonURI:", jsonURI);
      return jsonURI;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            owner,
            name,
            image,
            image_file_type
        } = req.body;
        if (owner && name) {
            try {
                let jsonURI = await uploadJsonFile(image, name, image_file_type, req.body);

                let tpl = new NFTTemplate({...req.body, metadata_uri: jsonURI});
                let saveTPl = await tpl.save();
                return res.status(200).send(saveTPl);
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