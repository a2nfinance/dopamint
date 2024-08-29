import connect from '@/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import PointRule from "@/database/models/pointrule";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            owner
        } = req.body;
        if (owner) {
        
            try {
                let objs = await  PointRule.find({owner: owner}).sort({created_at: -1});
                return res.status(200).send(objs);
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