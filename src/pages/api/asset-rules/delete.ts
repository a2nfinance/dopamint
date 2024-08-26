import connect from '@/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import NFTTemplate from "@/database/models/template";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            owner,
            _id,
        } = req.body;
        if (owner && _id) {
            try {
                await NFTTemplate.findByIdAndDelete(_id);
                return res.status(200).send("deleted");
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