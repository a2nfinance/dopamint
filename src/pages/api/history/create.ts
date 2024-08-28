import connect from '@/database/connect';
import History from "@/database/models/history";
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            user_id,
            template_id,
            metadata_uri
        } = req.body;
        if (user_id && template_id && metadata_uri) {
            try {
                await History.findOneAndUpdate(
                    { user_id: user_id, template_id: template_id, metadata_uri: metadata_uri },
                    {
                        user_id: user_id,
                        template_id: template_id,
                        metadata_uri: metadata_uri,
                        $inc: { count: 1 }
                    },
                    {
                        returnNewDocument: true,
                        upsert: true
                    }
                )
                return res.status(200).send({success: true});
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