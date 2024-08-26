import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let assetRule = new Schema({
    owner: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    metadata_uri: {
        type: String,
        require: false
    },
    nft_template_id: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});
let AssetRule = mongoose.model('AssetRule', assetRule);
mongoose.models = {};
export default AssetRule;