import connect from '@/database/connect';
import PointRule from "@/database/models/pointrule";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from 'next';
dotenv.config();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            owner,
            name,
        } = req.body;
        if (owner && name) {
            try {
                let obj = new PointRule(req.body);
                let savedObj = await obj.save();
                return res.status(200).send(savedObj);
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