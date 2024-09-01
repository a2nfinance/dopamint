import connect from '@/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import History from "@/database/models/history";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            user_id
        } = req.body;
        if (user_id) {

            try {
                let mintedNFTs = await History.find({ user_id: user_id }).select({ "template_id": 1, "_id": 0 }).exec();
                return res.status(200).send(mintedNFTs);
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