import connect from '@/database/connect';
import dotenv from "dotenv"
dotenv.config();
import OpenAI from "openai";
import GeneratedImage from "@/database/models/generatedimage";
import { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            owner,
            prompt,
            size
        } = req.body;
        if (owner) {
            try {
                const image = await openai.images.generate({
                    model: "dall-e-2",
                    n: 1,
                    prompt: prompt,
                    size: size
                });

                if (image.data && image.data.length) {
                    let obj = new GeneratedImage({ ...req.body, image: image.data });
                    await obj.save();
                }
                console.log(image.data);
                return res.status(200).send(image.data);
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