import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let nft_settings = new Schema({
    owner: {
        type: String,
        require: true
    },
    state: Object,
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});
let NFTSettings = mongoose.model('NFTSettings', nft_settings);
mongoose.models = {};
export default NFTSettings;