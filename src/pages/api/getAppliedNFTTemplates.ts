import connect from '@/database/connect';
import PointRule from "@/database/models/pointrule";
import StreakRule from "@/database/models/streakrule";
import NFTTemplate from "@/database/models/template";
import History from "@/database/models/history";
import AssetRule from "@/database/models/assetrule";
import { NextApiRequest, NextApiResponse } from 'next';

const getTemplateByPointRules = async (ownerId, userInfo) => {
    let DSCVRPoints = parseInt(userInfo.dscvrPoints) / 10 ** 6;
    let rules = await PointRule.find({ owner: ownerId, min_point: { $lte: DSCVRPoints }, max_point: { $gte: DSCVRPoints } }).select({ "nft_template_id": 1, "_id": 0 }).exec();
    let templateIds = rules.map(r => r.nft_template_id);
    let templates = await NFTTemplate.find({ "_id": { $in: templateIds } });
    return templates;
}

const getTemplateByStreakRules = async (ownerId, userInfo) => {
    let streak = userInfo.streak.dayCount;
    let multiplier = userInfo.streak.multiplierCount;
    let rules = await StreakRule.find({
        owner: ownerId,
        min_streak: { $lte: streak },
        max_streak: { $gte: streak },
        min_multiplier: { $lte: multiplier },
        max_multiplier: { $gte: multiplier },
    })
        .select({ "nft_template_id": 1, "_id": 0 })
        .exec();
    let templateIds = rules.map(r => r.nft_template_id);
    let templates = await NFTTemplate.find().where("_id").in(templateIds).exec();
    console.log(templates);
    return templates;
}

const getTemplateByAssetRules =  async (ownerId, userInfo) => {
    let history = await History.find({ user_id:  userInfo.id }).select({ "metadata_uri": 1, "_id": 0 }).exec();
    let metadata_uris = history.map(r => r.metadata_uri);
    let rules = await AssetRule.find({ owner: ownerId, metadata_uri: {$in: metadata_uris} }).select({ "nft_template_id": 1, "_id": 0 }).exec();
    let templateIds = rules.map(r => r.nft_template_id);
    let templates = await NFTTemplate.find({ "_id": { $in: templateIds } });
    return templates;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            ownerId,
            userInfo
        } = req.body;
        if (ownerId && userInfo) {
            try {
                const ptemplates = await getTemplateByPointRules(ownerId, userInfo);
                const stemplates = await getTemplateByStreakRules(ownerId, userInfo);
                const atemplates = await getTemplateByAssetRules(ownerId, userInfo);
                return res.status(200).send(ptemplates.concat(stemplates).concat(atemplates));
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