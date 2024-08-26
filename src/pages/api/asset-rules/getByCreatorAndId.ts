import connect from '@/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import NFTTemplate from "@/database/models/template";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            _id,
            owner
        } = req.body;
        if (_id && owner) {
        
            try {
                let tpl = await NFTTemplate.findOne({_id: _id, owner: owner});
                return res.status(200).send(tpl);
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